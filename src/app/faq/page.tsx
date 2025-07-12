import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - BravoPic Image Converter",
  description: "Frequently asked questions about BravoPic Image Converter. Learn how to convert PNG to WebP, JPG, and other formats safely and efficiently.",
};

export default function FAQ() {
  const faqs = [
    {
      question: "How does image conversion work?",
      answer: "BravoPic converts images directly in your browser. When you upload files, the conversion is processed client-side using JavaScript, so your images are never sent to our servers. This ensures faster and safer conversion."
    },
    {
      question: "What file formats are supported?",
      answer: "We currently support PNG, JPG, JPEG, and WebP formats. You can convert PNG to WebP or JPG, and JPG to WebP. We plan to add more formats in the future."
    },
    {
      question: "Are there file size limits?",
      answer: "Since processing happens in your browser, we generally recommend files under 100MB. Very large files may take longer to process. For optimal performance, we recommend using files under 10MB."
    },
    {
      question: "Are my images safe?",
      answer: "Yes, completely safe. All image conversion is processed locally in your browser, and files are never uploaded to our servers. Your converted images are stored only on your device and cannot be accessed by third parties."
    },
    {
      question: "How do I download converted images?",
      answer: "Once conversion is complete, download links are automatically generated. Click the 'Download' button to save your converted image, or if you've converted multiple files, you can download them all as a ZIP file."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-yellow-100 rounded-2xl shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions (FAQ)</h1>
        <p className="text-gray-600 text-lg">
          Find answers to common questions about BravoPic Image Converter.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-6">
            <h3 className="text-xl font-semibold text-black mb-3 flex items-center">
              <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                {index + 1}
              </span>
              {faq.question}
            </h3>
            <p className="text-gray-700 leading-relaxed pl-9">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-black mb-2">Have more questions?</h3>
        <p className="text-gray-700 mb-4">
          If you couldn't find the answer you were looking for in our FAQ, feel free to reach out to us anytime.
        </p>
        <div className="flex flex-wrap gap-3">
          <a 
            href="/how-to-use" 
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors font-medium"
          >
            How to Use
          </a>
          <a 
            href="/privacy-policy" 
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors font-medium"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
} 