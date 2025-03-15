// import { useState } from "react";

// type DetectionResult = {
//     label: string;
//     score: number;
// };

// const useDetectImage = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [result, setResult] = useState<DetectionResult | null>(null);

//     const handleImageDetectAI = async (file: File) => {
//         setIsLoading(true);
//         setError(null);

//         try {
//             const reader = new FileReader();
//             const data = await new Promise<ArrayBuffer>((resolve, reject) => {
//                 reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
//                 reader.onerror = reject;
//                 reader.readAsArrayBuffer(file);
//             });

//             const response = await fetch(
//                 "https://router.huggingface.co/hf-inference/models/haywoodsloan/ai-image-detector-dev-deploy",
//                 {
//                     method: "POST",
//                     headers: {
//                         Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
//                         "Content-Type": "application/octet-stream",
//                     },
//                     body: data,
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error(`API request failed with status ${response.status}`);
//             }

//             const result = await response.json();
//             setResult(result);
//             return result;
//         } catch (err) {
//             setError(err?.message || "Failed to detect image");
//             throw err;
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return {
//         isLoading,
//         error,
//         result,
//         detectImage: handleImageDetectAI,
//     };
// };

// export default useDetectImage;