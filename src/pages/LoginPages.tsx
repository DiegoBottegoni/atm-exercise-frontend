import { useState } from "react";
import { login, exit } from "../api/atm";

interface LoginProps {
    onLoginSuccess: (options: string[]) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginProps) {
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [lockout, setLockout] = useState(false); // Estado para bloquear el login

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const response = await login(Number(pin));

            if (response.options) {
                onLoginSuccess(response.options);
            } else if (response.message) {
                setError(response.message);
                // Detectar si el mensaje indica que se superaron los 3 intentos
                if (response.message.includes("Se superaron los 3 intentos")) {
                    setLockout(true);
                }
            }
        } catch (err) {
            setError("Error al conectarse con el cajero." + err);
        }
    };

    const handleResetAttempts = async () => {
        try {
            await exit(); // Hace POST a /exit
            setLockout(false);
            setError("");
            setPin("");
        } catch {
            setError("No se pudo reiniciar los intentos. Intenta de nuevo.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-2">Cajero Automático Simulado</h1>
            <p className="mb-4 text-center text-gray-400">
                Bienvenido al ejercicio de simulación de un cajero automático propuesto por TalentoTech. <br />
                Ingresa el PIN para comenzar. (Proba con cualquier PIN para probar errores, o con <strong>1234</strong> para un acceso exitoso)
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xs">
                <input
                    type="number"
                    placeholder="Ingrese PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={lockout} // Deshabilitado si se excedieron los intentos
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                    disabled={lockout}
                >
                    Ingresar
                </button>
            </form>

            {error && (
                <div className="mt-3 text-center">
                    <p className="text-red-600 font-medium">{error}</p>
                    {lockout && (
                        <button
                            onClick={handleResetAttempts}
                            className="mt-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition-colors"
                        >
                            Reiniciar intentos
                        </button>
                    )}
                </div>
            )}

            <p className="mt-6 text-sm text-gray-500 text-center">
                Este es un proyecto educativo para practicar desarrollo fullstack.
            </p>
        </div>
    );
}
