import React from "react";

export function useForm(inputs:string[], defaultValues?: Record<string,unknown>) {
    const [input, setInput] = React.useState<Record<string,unknown>>({})
    const [uploadLoading, isLoading] = React.useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>, enp:string, imageFile?:File, callback?:()=>void) => {
        e.preventDefault()
        const form = e.currentTarget
        isLoading(true)

        try {
            let imageUrl = "";

            if (imageFile) {
                const uploadFormData = new FormData();
                uploadFormData.append("image", imageFile);

                const uploadResponse = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: uploadFormData,
                });

                if (!uploadResponse.ok) {
                    throw new Error("Failed To Upload.");
                }

                const uploadResult = await uploadResponse.json();
                imageUrl = uploadResult.url;
            }

            const formData = new FormData(form)
            const resultForm: Record<string,unknown> = {
                ...defaultValues
            }

            inputs.forEach(input => {
                const value = formData.get(input)

                if (value instanceof File) {
                    resultForm[input] = imageUrl
                    return
                }

                const valueStr = value?.toString() || ""
                const numericInputs = ["age", "series"]
                resultForm[input] = numericInputs.includes(input) && !isNaN(Number(valueStr)) && valueStr !== "" ? Number(valueStr) : valueStr
            })

            setInput(resultForm)

            const response = await fetch(enp, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resultForm)
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || result.message || "Failed to Create. Try Again.");
            }
            alert("Create Succes.");
            location.reload()

            if(callback) callback()
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something Went Wrong.";
            alert(message);
        } finally {
            isLoading(false)
        }
    }
    return {onSubmit, input, uploadLoading};
}