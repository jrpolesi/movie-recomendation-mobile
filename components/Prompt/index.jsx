import { useState } from "react";
import Dialog from "react-native-dialog";

export function Prompt({ title, description, visible, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Description>{description}</Dialog.Description>
      <Dialog.Input
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Dialog.Button
        label="Enviar"
        onPress={() => {
          onSubmit(inputValue);
        }}
      />
    </Dialog.Container>
  );
}
