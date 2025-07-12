export default function HowToUsePage() {
  return (
    <section className="bg-yellow-100 rounded-2xl shadow-lg p-8 max-w-2xl mx-auto my-12">
      <h1 className="text-3xl font-extrabold mb-6 text-black">How to Use</h1>
      <ol className="list-decimal list-inside space-y-4 text-lg text-black">
        <li>
          <b>Upload PNG Files</b><br />
          - Drag and drop or click to upload the PNG images you want to convert.<br />
          - You can upload multiple files at once.
        </li>
        <li>
          <b>Select Output Format</b><br />
          - For each image, select your desired format (WebP or JPG).
        </li>
        <li>
          <b>Start Conversion</b><br />
          - Click the "Convert All" button to convert your images to the selected format.
        </li>
        <li>
          <b>Download Results</b><br />
          - Download each converted image individually or use the "Save All" button to download all at once.<br />
          - If you convert two or more images, you can download them as a ZIP file.
        </li>
        <li>
          <b>Other Information</b><br />
          - All conversions are processed directly in your browser. No image files are ever sent to or stored on the server. Your privacy is fully protected.<br />
          - The service works on mobile, tablet, and PC devices.
        </li>
      </ol>
      <hr className="my-8 border-yellow-300" />
      <p className="text-sm text-yellow-700">Contact: convertstyvho@gmail.com</p>
    </section>
  );
} 