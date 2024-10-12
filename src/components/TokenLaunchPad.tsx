import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type InputField = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required: boolean;
};

const TokenLaunchPad = () => {
    const [inputs, setInputs] = useState<{
        name: string;
        symbol: string;
        imageUrl: string;
        initialSupply: string;
    }>({
        name: "",
        symbol: "",
        imageUrl: "",
        initialSupply: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const inputFields: InputField[] = [
        { label: "Name", value: inputs.name, onChange: handleInputChange, required: true },
        { label: "Symbol", value: inputs.symbol, onChange: handleInputChange, required: true },
        { label: "Image URL", value: inputs.imageUrl, onChange: handleInputChange, required: true },
        { label: "Initial Supply", value: inputs.initialSupply, onChange: handleInputChange, required: true },
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Form submitted with:", inputs);
    };

    return (
        <form
            className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg text-white max-w-lg mx-auto"
            onSubmit={handleSubmit}
        >
            <h2 className="text-3xl font-bold text-center text-gray-100">Token LaunchPad</h2>
            <p className="text-center text-gray-400 mb-6">
                Launch your token with ease in a few simple steps.
            </p>
            {inputFields.map(({ label, value, onChange, required }) => (
                <div key={label} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        {label}
                    </label>
                    <Input
                        name={label.toLowerCase().replace(" ", "")}
                        type="text"
                        placeholder={label}
                        value={value}
                        onChange={onChange}
                        required={required}
                        className="bg-gray-800 text-gray-200 border-gray-600 placeholder-gray-500 focus:ring-green-500 focus:border-green-500"
                    />
                </div>
            ))}
            <Button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none focus:ring-opacity-50"
            >
                Create a Token
            </Button>
        </form>
    );
};

export default TokenLaunchPad;
