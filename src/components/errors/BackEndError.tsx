import { ReactElement } from "react";

export const BackEndError = (): ReactElement => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h1 className="text-4xl font-bold text-red-600">Oops! Algo deu errado.</h1>
        <p className="mt-4 text-lg">Parece que nossa aplicação está fora do ar no momento.</p>
        <p className="mt-2">Estamos trabalhando para resolver isso o mais rápido possível.</p>
      </div>
    </div>
  );
};

