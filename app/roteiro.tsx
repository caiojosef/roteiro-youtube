import { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import RenderHtml from "react-native-render-html";

export default function RoteiroScreen() {
    const { titulo, tema, duracao, palavras, tom } = useLocalSearchParams();
    const [roteiro, setRoteiro] = useState<string | null>(null);
    const [erro, setErro] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(true);
    const router = useRouter();

    async function gerarRoteiro() {
        try {
            setCarregando(true);
            setErro(null);
            setRoteiro(null);

            const prompt = `
      Gere um roteiro completo em Markdown para YouTube com base nas informações:
      🎬 **Título:** ${titulo}
      🧠 **Tema:** ${tema}
      ⏱️ **Duração:** ${duracao}
      🔑 **Palavras-chave:** ${palavras}
      🎙️ **Tom:** ${tom}

      O texto deve ser formatado em Markdown, com:
      - Título principal
      - Blocos separados por seções
      - Destaques em negrito e listas
      - Um encerramento natural (call to action leve)
      `;

            const response = await fetch("http://192.168.56.1:5500/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Erro da API:", data);
                throw new Error(data.error?.message || "Erro desconhecido na API");
            }

            if (data.result) {
                setRoteiro(data.result);
            } else {
                setErro("Nenhum roteiro foi gerado pelo Gemini.");
            }
        } catch (err) {
            console.error(err);
            setErro("Erro ao gerar roteiro com o Gemini.");
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        gerarRoteiro();
    }, []);

    const width = Dimensions.get("window").width - 40;

    if (carregando)
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Gerando seu roteiro...</Text>
            </View>
        );

    if (erro)
        return (
            <View style={styles.center}>
                <Text style={styles.error}>{erro}</Text>
                <TouchableOpacity style={styles.button} onPress={gerarRoteiro}>
                    <Text style={styles.buttonText}>🔁 Tentar novamente</Text>
                </TouchableOpacity>
            </View>
        );

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.header}>
                <Text style={styles.title}>🎬 {titulo}</Text>
            </View>

            {roteiro ? (
                <RenderHtml
                    contentWidth={width}
                    source={{ html: markdownToHtml(roteiro) }}
                    baseStyle={{ color: "#222", fontSize: 16, lineHeight: 24 }}
                />
            ) : (
                <Text>Nenhum texto gerado ainda.</Text>
            )}

            <View style={styles.footer}>
                <TouchableOpacity style={[styles.button, styles.back]} onPress={() => router.back()}>
                    <Text style={styles.buttonText}>← Voltar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.reload]} onPress={gerarRoteiro}>
                    <Text style={styles.buttonText}>🔁 Gerar Novo</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function markdownToHtml(md: string): string {
    return md
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>")
        .replace(/\*(.*?)\*/gim, "<i>$1</i>")
        .replace(/^- (.*$)/gim, "<li>$1</li>")
        .replace(/\n$/gim, "<br />")
        .replace(/\n/gim, "<br />");
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#222",
        marginBottom: 15,
    },
    header: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        paddingBottom: 10,
        marginBottom: 20,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    reload: {
        backgroundColor: "#28a745",
    },
    back: {
        backgroundColor: "#555",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    error: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 15,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        color: "#333",
    },
});
