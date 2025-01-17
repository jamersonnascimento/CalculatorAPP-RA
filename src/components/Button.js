//Button.js (Componente para botões)
import React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
/*
Dica1: Parâmetros são as variáveis definidas para receber valores em uma função.
Argumentos são os valores que você passa para a função quando a chama.
Dica2: A constante Button (que é um componente personalizado) deve começar com letra maiúscula, pois é um componente React. Normalmente, uma constante deve começar com camelCase, como uma váriável. Já uma constante de valor único já definido deve ter todas letras maíusculas.
Dica3: As tags `TouchableOpacity, Text e View` são componentes nativos do React Native.
Dica4: Quando você vê chaves em uma função que recebe um objeto como argumento, isso geralmente indica que você está utilizando a desestruturação.
*/
const Button = ({ label, onPress, style, textStyle }) => { //Estou criando uma constante chamada Button (componente personalizado), que é uma função anônima que recebe um único objeto de propriedades (props) como parâmetro e utiliza a desestruturação para extrair as propriedades label e onPress.
    return ( // return (: Inicia o retorno do JSX que será renderizado. O que é JSX? É uma sintaxe de código que permite escrever HTML dentro de um arquivo JavaScript.
        // A expressão {label} abaixo, no contexto do código não é um objeto, mas sim uma propriedade que está sendo extraída de um objeto.
        //`TouchableOpacity` (componente que representa o botão) tem propriedades `style` e `onPress`. `style` aplica os estilos definidos em `styles.button`. `onPress` é uma função que, quando acionada, chama outra função (`onPress`) passando `label` como argumento.
        <TouchableOpacity style={[styles.button, style]} onPress={() => onPress(label)}> 
            <Text style={[styles.text, textStyle]}>{label}</Text> 
        </TouchableOpacity>
    );
};

// "A constante styles está recebendo o resultado da chamada ao método create do objeto StyleSheet, que instancia um conjunto de estilos."
const styles = StyleSheet.create({ // O método create está recebendo como argumento um objeto, que possui as propriedades button e text.
    button: { //O valor associado à propriedade button é um objeto que contém várias propriedades de estilo (como flex, margin, backgroundColor, etc.).
        flex: 1, //Define que o componente deve ocupar o espaço disponível em seu contêiner.
        margin: 5, //Define uma margem de 5 unidades ao redor do componente.
        backgroundColor: '#444', //Define a cor de fundo do componente como um tom escuro (hexadecimal).
        justifyContent: 'center', //Alinha o conteúdo do componente no centro ao longo do eixo principal.
        alignItems: 'center', // Alinha o conteúdo no centro ao longo do eixo
        borderRadius: 5, //Arredonda os cantos do componente com um raio de 5 unidades.
        height: 80, //Define a altura do componente como 80 unidades.
    },
    text: {
        fontSize: 40, //Define o tamanho da fonte do texto como 24 unidades.
        color: '#fff', //Define a cor do texto como branco (hexadecimal).
    },
});

export default Button;

/*
Resumo Final a respeito de `props`:
props é um objeto: Sempre que você define um componente e passa propriedades para ele, o React cria um objeto props que contém essas propriedades.
Desestruturação: Ao desestruturar props, você facilita o acesso às propriedades que precisa sem ter que referenciá-las como props.label ou props.onPress.
Visibilidade: Você não vê o objeto props explicitamente no seu código, mas ele é gerado automaticamente pelo React quando você utiliza o componente.
Portanto, sim, é correto afirmar que o objeto props é criado e passado para o seu componente, mas você não o vê diretamente no seu código. Isso é uma parte fundamental do funcionamento do React!
*/