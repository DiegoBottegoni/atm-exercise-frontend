import { useState } from "react";
import { login } from "../api/atm";

interface LoginProps {
    onLoginSuccess: (options: string[]) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginProps) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const response = await login(Number(pin));
            if (response.options) {
                onLoginSuccess(response.options);
            } else if (response.message) {
                setError(response.message);
            }
        } catch (err) {
            setError("Error al conectarse con el cajero" + err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Cajero Automático</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="number"
                    placeholder="Ingrese PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="border-2 p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Ingresar
                </button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}