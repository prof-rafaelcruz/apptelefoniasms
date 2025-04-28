import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms';

export default function SmsScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const sendSMS = async () => {
    if (!phoneNumber || !message) {
      Alert.alert("Erro", "Preencha o número e a mensagem.");
      return;
    }

    const isAvailable = await SMS.isAvailableAsync();

    if (isAvailable) {
      await SMS.sendSMSAsync([phoneNumber], message);
    } else {
      Alert.alert("Erro", "Envio de SMS não está disponível neste dispositivo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar SMS</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Digite o número"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Digite a mensagem"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Enviar SMS" onPress={sendSMS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },
});
