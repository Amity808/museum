import { useState } from "react"
import useLoading from "./useLoading"
import useNotification from "./useNotification"

type DetectionResult = {
    label: string;
    score: number;
}

interface UseDetectImageProps {
    imageURI: string;
}

const useDetectImage = ({ imageURI }: UseDetectImageProps) => {
    const [result, setResult] = useState<DetectionResult | null>(null)
    const { isLoading, startLoading, stopLoading } = useLoading()
    const { setSuccessNotification, setErrorNotification, notification } = useNotification()

    const getTopResult = (response: DetectionResult[]) => {
        return response.reduce(
            (top, current) => (current.score > top.score ? current : top),
            { label: "", score: -Infinity }
        );
    }

    const handleImageDetectAI = async () => {
        startLoading();

        try {
            const imageResponse = await fetch(imageURI);
            if (!imageResponse.ok) {
                setErrorNotification("Failed to fetch image");
                stopLoading();
                return;
            }

            const arrayBuffer = await imageResponse.arrayBuffer();
            const imageBuffer = Buffer.from(arrayBuffer);

            const response = await fetch(
                "https://router.huggingface.co/hf-inference/models/haywoodsloan/ai-image-detector-dev-deploy",
                {
                    headers: {
                        Authorization:  `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}`,
                        "Content-Type": "application/octet-stream",
                    },
                    method: "POST",
                    body: imageBuffer,
                }
            );

            const contentType = response.headers.get("content-type");
            if (!contentType?.includes("application/json")) {
                const text = await response.text();
                throw new Error(`Unexpected response: ${text.slice(0, 100)}`);
            }

            const responseData: DetectionResult[] = await response.json();
            const topResult = getTopResult(responseData);

            setResult(topResult);
            stopLoading();
            setSuccessNotification("Image detected successfully");
            return topResult;
            
        } catch (error) {
            console.error(error);
            setErrorNotification("Error detecting image");
            stopLoading();
        }
    }

    return { result, isLoading, handleImageDetectAI, notification };
}

export default useDetectImage;
