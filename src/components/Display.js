// Display.js (Componente para exibir resultados)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Display = ({ value }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.display}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%', // Define a largura do display para ocupar toda a largura do contêiner
        height: 150, // Define uma altura fixa para o contêiner
        justifyContent: 'center', // Centraliza o conteúdo verticalmente
        alignItems: 'center', // Centraliza o conteúdo horizontalmente
        backgroundColor: '#122', // Cor de fundo do display
        borderWidth: 2, // Adiciona uma borda ao redor do display
        borderColor: '#fff', // Cor da borda
        padding: 10, // Adiciona padding ao redor do texto
        borderRadius: 10, // Adiciona cantos arredondados
        marginBottom: 1, // Adiciona uma margem inferior para separar do teclado
        marginTop: 160,
    },
    display: {
        fontSize: 60, // Define o tamanho da fonte
        color: '#fff', // Define a cor do texto
        flexWrap: 'wrap', // Permite que o texto se quebre em múltiplas linhas
        textAlign: 'center', // Centraliza o texto horizontalmente
    },
});

export default Display;

