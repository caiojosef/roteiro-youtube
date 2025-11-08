import { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import { formStyles as styles } from '../src/styles/formStyles';
import { validarCampos } from '../src/utils/formUtils';

export default function HomeScreen() {
  const [titulo, setTitulo] = useState('5 Dicas Para Crescer Seu Canal em 2025');
  const [tema, setTema] = useState('Criação de conteúdo para YouTube, com foco em engajamento e SEO.');
  const [duracao, setDuracao] = useState('5 minutos');
  const [palavras, setPalavras] = useState('YouTube, crescimento, dicas, conteúdo, SEO');
  const [tom, setTom] = useState('Inspirador');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎬 Gerar Roteiro de Vídeo com IA</Text>
      <Text style={styles.subtitle}>
        Preencha os campos abaixo e gere um roteiro completo para seu vídeo no YouTube.
      </Text>

      <Text style={styles.label}>Título do Vídeo</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Tema Principal do Vídeo</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={tema}
        onChangeText={setTema}
      />

      <Text style={styles.label}>Duração Desejada</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={duracao} onValueChange={setDuracao}>
          <Picker.Item label="1 minuto" value="1 minuto" />
          <Picker.Item label="3 minutos" value="3 minutos" />
          <Picker.Item label="5 minutos" value="5 minutos" />
          <Picker.Item label="10 minutos" value="10 minutos" />
        </Picker>
      </View>

      <Text style={styles.label}>Palavras-chave (opcional)</Text>
      <TextInput style={styles.input} value={palavras} onChangeText={setPalavras} />

      <Text style={styles.label}>Tom do Roteiro</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={tom} onValueChange={setTom}>
          <Picker.Item label="Inspirador" value="Inspirador" />
          <Picker.Item label="Educativo" value="Educativo" />
          <Picker.Item label="Engraçado" value="Engraçado" />
          <Picker.Item label="Motivacional" value="Motivacional" />
          <Picker.Item label="Técnico" value="Técnico" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Link
          href={{
            pathname: '/roteiro',
            params: { titulo, tema, duracao, palavras, tom },
          }}
          asChild
        >
          <Button title="Gerar Roteiro" />
        </Link>
      </View>
    </ScrollView>
  );
}
