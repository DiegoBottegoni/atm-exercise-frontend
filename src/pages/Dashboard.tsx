import { useState } from "react";
import { getBalance, deposit, withdraw, exit } from "../api/atm";

interface DashboardProps {
    onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
    const [balance, setBalance] = useState<number | null>(null);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState<{ text: string; type: "error" | "success" | "info" } | null>(null);

    const handleCheckBalance = async () => {
        const res = await getBalance();
        setBalance(res.balance);
        setMessage({ text: "Saldo actualizado", type: "info" });
    };

    const handleDeposit = async () => {
        const res = await deposit(Number(amount));
        if (res.balance !== undefined) setBalance(res.balance);
        setMessage({ text: res.message || "Depósito realizado", type: "success" });
        setAmount("");
    };

    const handleWithdraw = async () => {
        try {
            const res = await withdraw(Number(amount));
            setBalance(res.balance);
            setMessage({ text: res.message || "Operación realizada", type: "success" });
        } catch (err: unknown) {
            let errorMessage = "Error desconocido";
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setMessage({ text: errorMessage, type: "error" });
        }
        setAmount("");
    };



    const handleExit = async () => {
        await exit();
        onLogout();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 p-4">
            <h2 className="text-2xl font-bold">Bienvenido al Cajero</h2>

            <div className="p-4 rounded shadow w-full max-w-sm flex flex-col gap-4">
                <button
                    onClick={handleCheckBalance}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Consultar Saldo
                </button>
                {balance !== null && <p>Saldo actual: ${balance}</p>}

                <div className="flex flex-col gap-2">
                    <label htmlFor="amount" className="font-medium">Cantidad</label>
                    <input
                        id="amount"
                        type="number"
                        min={0}
                        placeholder="Ingrese monto"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="border p-2 rounded"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleDeposit}
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 flex-1"
                    >
                        Depositar
                    </button>
                    <button
                        onClick={handleWithdraw}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex-1"
                    // disabled={balance === 0 || balance === null}
                    >
                        Retirar
                    </button>
                </div>

                <button
                    onClick={handleExit}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 mt-2"
                >
                    Salir
                </button>

                {message && (
                    <p
                        className={`mt-2 ${message.type === "success" ? "text-green-600" :
                            message.type === "error" ? "text-red-600" : "text-purple-700"
                            }`}
                    >
                        {message.text}
                    </p>
                )}
            </div>
        </div>
    );
}
