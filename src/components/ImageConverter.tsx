"use client";
import { useRef, useState, useCallback, useMemo } from "react";
import JSZip from "jszip";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UploadCloud, Download, CheckCircle } from "lucide-react";
import React from "react"; // Added missing import

// FileList와 ResultList를 별도 컴포넌트로 분리

function FileList({ fileArr, resultArr, onFormatChange, onRemove, onDownload }: {
  fileArr: FileItem[];
  resultArr: ResultItem[];
  onFormatChange: (idx: number, format: string) => void;
  onRemove: (idx: number) => void;
  onDownload: (idx: number) => void;
}) {
  const [thumbUrls, setThumbUrls] = React.useState<(string | null)[]>([]);

  React.useEffect(() => {
    let isMounted = true;
    Promise.all(
      fileArr.map(item =>
        new Promise<string | null>(resolve => {
          const reader = new FileReader();
          reader.onload = e => resolve(e.target?.result as string);
          reader.readAsDataURL(item.file);
        })
      )
    ).then(result => {
      if (isMounted) setThumbUrls(result);
    });
    return () => { isMounted = false; };
  }, [fileArr]);

  return (
    <ul className="mb-8 bg-yellow-400 rounded-xl">
      {fileArr.map((item, idx) => {
        const result = resultArr[idx];
        const key = `${item.file.name}_${item.file.size}`;
        return (
          <li key={key} className="flex items-center bg-yellow-200 rounded-xl border border-yellow-300 shadow-md p-3 mb-3 gap-4 transition">
            {/* Input area */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* 썸네일 이미지 */}
              {thumbUrls[idx] ? (
                <img src={thumbUrls[idx] as string} alt="thumb" className="w-8 h-8 rounded-md object-cover border border-yellow-300 bg-white" />
              ) : (
                <span className="w-8 h-8 rounded-md bg-yellow-100 border border-yellow-300 flex items-center justify-center text-yellow-700 font-bold">?</span>
              )}
              <span className="font-bold truncate text-black">{item.file.name}</span>
              <span className="text-yellow-700 text-sm font-bold">{(item.file.size / 1024 / 1024).toFixed(1)} MB</span>
              <select
                className="rounded-xl border-none px-2 py-1 bg-yellow-100 text-black font-bold focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:bg-yellow-200 transition"
                value={item.format.toUpperCase()}
                onChange={e => onFormatChange(idx, e.target.value)}
              >
                {TO_FORMATS.map(f => (
                  <option key={f.label} value={f.label}>{f.label}</option>
                ))}
              </select>
              <Button variant="ghost" size="icon" className="text-black hover:bg-yellow-200 rounded-xl" onClick={() => onRemove(idx)}>
                &times;
              </Button>
            </div>
            {/* Result area */}
            <div className="flex items-center gap-2 min-w-[180px] justify-end">
              {result ? (
                <>
                  <img src={result.thumb} alt="thumb" className="w-10 h-10 rounded-xl object-cover border border-yellow-300" />
                  <span className="text-yellow-700 text-xs font-bold">{result.inSize} → <span className="text-black font-bold">{result.outSize}</span></span>
                  <CheckCircle className="text-yellow-500 w-5 h-5 mx-1" />
                  <span className="text-black text-xs font-bold">{result.time}s</span>
                  <button
                    className="text-black text-xl ml-1 hover:text-yellow-700"
                    onClick={() => onDownload(idx)}
                    title="Download"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <span className="text-yellow-700 text-xs font-bold">Waiting for conversion</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

type FileItem = { file: File; format: string };
type ResultItem = {
  url: string;
  outName: string;
  inSize: string;
  outSize: string;
  time: string;
  thumb: string;
};

// 지원 포맷 목록
const ADD_FORMATS = [
  { label: "BMP", mime: "image/bmp" },
  { label: "CR3", mime: "image/x-canon-cr3" },
  { label: "DNG", mime: "image/x-adobe-dng" },
  { label: "HEIC", mime: "image/heic" },
  { label: "JFIF", mime: "image/jfif" },
  { label: "JPG", mime: "image/jpeg" },
  { label: "PNG", mime: "image/png" },
  { label: "TIFF", mime: "image/tiff" },
  { label: "GIF", mime: "image/gif" },
];
const TO_FORMATS = [
  { label: "WEBP", mime: "image/webp" },
  { label: "AVIF", mime: "image/avif" },
  { label: "BMP", mime: "image/bmp" },
  { label: "GIF", mime: "image/gif" },
  { label: "ICO", mime: "image/x-icon" },
  { label: "JFIF", mime: "image/jfif" },
  { label: "JPG", mime: "image/jpeg" },
  { label: "PNG", mime: "image/png" },
  { label: "TIFF", mime: "image/tiff" },
];

export default function ImageConverter() {
  const [fileArr, setFileArr] = useState<FileItem[]>([]);
  const [resultArr, setResultArr] = useState<(ResultItem | null)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 추가: 입력/변환 포맷 상태
  const [addFormat, setAddFormat] = useState(ADD_FORMATS[6]); // 기본 PNG
  const [toFormat, setToFormat] = useState(TO_FORMATS[0]); // 기본 WEBP

  // 파일 추가 (선택된 입력 포맷만 허용)
  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).filter(f => f.type === addFormat.mime);
    if (arr.length === 0) {
      alert(`입력 포맷(${addFormat.label})과 다른 파일이 포함되어 있습니다.\n파일 포맷을 확인하세요.`);
      return;
    }
    setFileArr(prev =>
      [
        ...prev,
        ...arr.filter(f => !prev.some(p => p.file.name === f.name && p.file.size === f.size))
          .map(f => ({ file: f, format: toFormat.label.toLowerCase() as any })),
      ]
    );
  }, [addFormat, toFormat]);

  // 파일 삭제
  const removeFile = useCallback((idx: number) => setFileArr(arr => arr.filter((_, i) => i !== idx)), []);
  // 포맷 변경 (개별 파일 → 전체 변환 포맷으로 통일)
  const changeFormat = useCallback((idx: number, format: string) =>
    setFileArr(arr => arr.map((item, i) => (i === idx ? { ...item, format: format.toLowerCase() } : item))),
    []
  );

  // 변환 실행 (선택된 변환 포맷으로 변환, 변환 안된 파일만 변환)
  async function handleConvertAll() {
    setResultArr(prev => {
      // 이미 변환된 항목은 그대로 두고, 변환 안된 항목만 null로 채움
      const newArr = fileArr.map((item, idx) => prev[idx] ?? null);
      return newArr;
    });
    const results: (ResultItem | null)[] = await Promise.all(
      fileArr.map(async (item, idx) => {
        // 이미 변환된 항목은 그대로 반환
        if (resultArr[idx]) return resultArr[idx];
        const t0 = performance.now();
        const dataUrl = await fileToDataUrl(item.file);
        const { blob, thumb } = await convertToFormat(dataUrl, toFormat.label.toLowerCase());
        const t1 = performance.now();
        const outName = item.file.name.replace(/\.[^/.]+$/, "") +
          (toFormat.label === "JPG" ? ".jpg" : `.${toFormat.label.toLowerCase()}`);
        return {
          url: URL.createObjectURL(blob),
          outName,
          inSize: (item.file.size / 1024).toFixed(0) + " KB",
          outSize: (blob.size / 1024).toFixed(0) + " KB",
          time: ((t1 - t0) / 1000).toFixed(2),
          thumb,
        };
      })
    );
    setResultArr(results);
  }

  // fileArr 상태 변화 감지
  React.useEffect(() => {
    setResultArr(prev => {
      if (fileArr.length === prev.length) return prev;
      // 새 파일이 추가되면 null로 채움
      return fileArr.map((_, idx) => prev[idx] ?? null);
    });
  }, [fileArr]);

  // 파일 → DataURL
  const fileToDataUrl = useCallback((file: File): Promise<string> =>
    new Promise(res => {
      const reader = new FileReader();
      reader.onload = e => res(e.target?.result as string);
      reader.readAsDataURL(file);
    }), []);

  // 변환 (Canvas)
  const convertToFormat = useCallback((dataUrl: string, format: string) =>
    new Promise<{ blob: Blob; thumb: string }>(resolve => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          blob => {
            resolve({ blob: blob!, thumb: canvas.toDataURL("image/webp", 0.7) });
          },
          format === "webp" ? "image/webp" : "image/jpeg"
        );
      };
      img.src = dataUrl;
    }), []);

  // 개별 다운로드
  const handleDownload = useCallback((idx: number) => {
    const meta = resultArr[idx];
    if (!meta) return;
    const { url, outName } = meta;
    const a = document.createElement("a");
    a.href = url;
    a.download = outName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }, [resultArr]);

  // Save All (fetch 대신 Blob 직접 사용)
  const handleSaveAll = useCallback(async () => {
    const validResults = resultArr.filter((meta): meta is ResultItem => !!meta);
    if (validResults.length === 1) {
      handleDownload(resultArr.findIndex(r => !!r));
    } else if (validResults.length > 1) {
      const zip = new JSZip();
      for (let i = 0; i < resultArr.length; i++) {
        const meta = resultArr[i];
        if (!meta) continue;
        // fetch 대신 Blob 직접 zip에 추가
        const blob = await (await fetch(meta.url)).blob();
        zip.file(meta.outName, blob);
      }
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted_images.zip";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
  }, [resultArr, handleDownload]);

  // 드래그 앤 드롭
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  }, [addFiles]);

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-2 bg-yellow-400 h-full">
      {/* 파일 선택 input: 항상 렌더링 */}
      <input
        ref={fileInputRef}
        type="file"
        accept={addFormat.mime}
        multiple
        className="hidden"
        onChange={e => addFiles(e.target.files)}
      />
      {/* Hero 영역 - 텍스트만 */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-black mb-2 drop-shadow-none">
          Image Converter <span className="text-black">{addFormat.label} to {toFormat.label}</span>
        </h1>
        <p className="text-lg md:text-2xl text-black font-bold mb-1">
          Convert your {addFormat.label} images to {toFormat.label} quickly and easily.
        </p>
        <p>
          <span className="text-black font-extrabold">100% Free</span>, No installation required!
        </p>
      </div>
      {/* 상단 포맷 선택 UI */}
      <div className="flex items-center justify-center gap-4 mb-8 rounded-xl bg-yellow-300 shadow-md p-6">
        <select
          className="rounded-xl border-none bg-yellow-100 px-4 py-2 text-lg font-bold text-black shadow-none focus:ring-2 focus:ring-yellow-300 outline-none"
          value={addFormat.label}
          onChange={e => {
            const found = ADD_FORMATS.find(f => f.label === e.target.value);
            if (found) setAddFormat(found);
          }}
        >
          {ADD_FORMATS.map(f => (
            <option key={f.label} value={f.label}>{f.label}</option>
          ))}
        </select>
        <span className="text-2xl text-black">→</span>
        <select
          className="rounded-xl border-none bg-yellow-100 px-4 py-2 text-lg font-bold text-black shadow-none focus:ring-2 focus:ring-yellow-300 outline-none"
          value={toFormat.label}
          onChange={e => {
            const found = TO_FORMATS.find(f => f.label === e.target.value);
            if (found) setToFormat(found);
            setFileArr(arr => arr.map(item => ({ ...item, format: e.target.value.toLowerCase() })));
          }}
        >
          {TO_FORMATS.map(f => (
            <option key={f.label} value={f.label}>{f.label}</option>
          ))}
        </select>
      </div>
      <motion.div
        className={`border-2 border-dotted border-gray-300 rounded-3xl min-h-[220px] flex flex-col items-center justify-center text-center transition-all cursor-pointer mb-8 p-6 ${fileArr.length > 0 ? 'bg-yellow-200' : 'bg-white hover:shadow-md'}`}
        whileHover={fileArr.length === 0 ? { scale: 1.01 } : undefined}
        {...(fileArr.length === 0 ? {
          onClick: () => fileInputRef.current?.click(),
          onDrop: handleDrop,
          onDragOver: (e: React.DragEvent) => e.preventDefault(),
        } : {})}
      >
        {fileArr.length === 0 ? (
          <>
            <UploadCloud className="mx-auto mb-4 text-black" size={56} />
            <div className="text-2xl font-bold mb-1 text-black">Add Image</div>
            <div className="text-black text-base">
              Drag & drop or {" "}
              <span
                className="text-black font-bold cursor-pointer underline"
                onClick={e => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                Select Image
              </span>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="w-full">
              <FileList
                fileArr={fileArr}
                resultArr={resultArr as ResultItem[]}
                onFormatChange={changeFormat}
                onRemove={removeFile}
                onDownload={handleDownload}
              />
            </div>
            <div className="flex gap-2 mt-4 justify-end w-full">
              <Button className="rounded-xl bg-yellow-500 text-black font-bold px-6 py-2 shadow-md border-none hover:bg-yellow-600 transition" onClick={() => fileInputRef.current?.click()}>
                + Add More
              </Button>
              {resultArr.some(r => !r) && (
                <Button className="rounded-xl bg-yellow-500 text-black font-bold px-6 py-2 shadow-md border-none hover:bg-yellow-600 transition" onClick={handleConvertAll} disabled={fileArr.length === 0}>
                  Convert All
                </Button>
              )}
              {fileArr.length > 0 && resultArr.length === fileArr.length && resultArr.every(r => r) && (
                <Button
                  className="rounded-xl bg-black text-yellow-400 font-bold px-6 py-2 shadow-md border-none hover:bg-yellow-800 transition"
                  onClick={handleSaveAll}
                >
                  Save All
                </Button>
              )}
            </div>
          </div>
        )}
      </motion.div>
      {/* 드롭존 외부의 FileList, 버튼 렌더링은 제거됨 */}
    </div>
  );
} 