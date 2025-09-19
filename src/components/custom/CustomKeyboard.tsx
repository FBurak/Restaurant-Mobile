import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Animated } from "react-native";
import { colors } from "../../theme/colors";

export default function CustomKeyboard({
  isVisible,
  onClose,
  onTextChange,
  initialText,
  placeholder,
}: {
  isVisible: boolean;
  onClose: () => void;
  onTextChange: (text: string) => void;
  initialText: string;
  placeholder: string;
}) {
  const [text, setText] = useState(initialText);
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.spring(keyboardHeight, { toValue: 280, useNativeDriver: false }).start();
    } else {
      Animated.spring(keyboardHeight, { toValue: 0, useNativeDriver: false }).start();
    }
  }, [isVisible]);

  useEffect(() => setText(initialText), [initialText]);

  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const type = (k: string) => {
    const nt = text + k;
    setText(nt);
    onTextChange(nt);
  };
  const back = () => {
    const nt = text.slice(0, -1);
    setText(nt);
    onTextChange(nt);
  };

  if (!isVisible) return null;

  return (
    <Modal animationType="none" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} onPress={onClose} />
        <Animated.View
          style={{
            height: keyboardHeight,
            backgroundColor: "#D1D8E0",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            paddingHorizontal: 8,
            paddingTop: 12,
          }}
        >
          <View style={{ backgroundColor: "white", borderRadius: 8, padding: 12, marginBottom: 12, minHeight: 40 }}>
            <Text style={{ color: text ? colors.ink : colors.sub, fontSize: 16 }}>{text || placeholder}</Text>
          </View>
          <View style={{ flex: 1 }}>
            {keys.map((row, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 8,
                  paddingHorizontal: i === 1 ? 15 : i === 2 ? 30 : 0,
                }}
              >
                {row.map((k) => (
                  <TouchableOpacity
                    key={k}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 6,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      marginHorizontal: 3,
                      minWidth: 28,
                      alignItems: "center",
                    }}
                    onPress={() => type(k)}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "500" }}>{k}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <TouchableOpacity style={{ backgroundColor: "#A8B4C4", borderRadius: 6, padding: 12, margin: 3 }}>
                <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>123</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "white", borderRadius: 6, paddingVertical: 12, paddingHorizontal: 32, margin: 3 }}
                onPress={() => type(" ")}
              >
                <Text style={{ fontSize: 16 }}>space</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#A8B4C4", borderRadius: 6, padding: 12, margin: 3 }}
                onPress={back}
              >
                <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>⌫</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#007AFF", borderRadius: 6, paddingVertical: 12, paddingHorizontal: 20, margin: 3 }}
                onPress={onClose}
              >
                <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
