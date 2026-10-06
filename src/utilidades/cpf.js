/** Formata enquanto a pessoa digita: 123.456.789-00 */
export function formatarCPF(entrada) {
  const numeros = entrada.replace(/\D/g, "").slice(0, 11);
  if (numeros.length <= 3) return numeros;
  if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
  if (numeros.length <= 9)
    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
  return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
}

export function somenteNumeros(entrada) {
  return entrada.replace(/\D/g, "");
}

function digitosConferem(numeros) {
  const calcular = (quantidade) => {
    let soma = 0;
    for (let i = 0; i < quantidade; i += 1) {
      soma += Number(numeros[i]) * (quantidade + 1 - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  return (
    calcular(9) === Number(numeros[9]) && calcular(10) === Number(numeros[10])
  );
}

/**
 * Devolve a mensagem de erro ou null.
 *
 * A mensagem diz o que fazer, não só que deu errado (WCAG 3.3.3):
 * "Falta 1 número" é mais útil que "CPF inválido".
 */
export function validarCPF(valor) {
  const numeros = somenteNumeros(valor);

  if (numeros.length === 0) {
    return "Digite o seu CPF para continuar. São 11 números.";
  }
  if (numeros.length < 11) {
    const faltam = 11 - numeros.length;
    return faltam === 1
      ? "Falta 1 número no CPF. Você digitou 10 de 11 números. Confira no seu documento e complete."
      : `Faltam ${faltam} números no CPF. Você digitou ${numeros.length} de 11 números. Confira no seu documento e complete.`;
  }
  if (/^(\d)\1{10}$/.test(numeros) || !digitosConferem(numeros)) {
    return "Esse CPF não existe. Confira os números no seu documento e digite de novo.";
  }
  return null;
}
