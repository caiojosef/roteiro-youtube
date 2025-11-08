export function validarCampos(obj: Record<string, string>) {
    for (const [chave, valor] of Object.entries(obj)) {
        if (!valor.trim()) {
            return `O campo "${chave}" está vazio.`;
        }
    }
    return null;
}
