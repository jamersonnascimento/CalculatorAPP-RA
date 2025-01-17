import React, { useState } from "react"; // Importa React e o hook useState para gerenciar o estado no componente
import { View, StyleSheet } from "react-native"; // Importa os componentes View e StyleSheet do React Native
import Button from '../components/Button'; // Importa o componente Button do diretório de componentes
import Display from '../components/Display'; // Importa o componente Display do diretório de componentes

// Função anônima que define o componente CalculatorScreen
const CalculatorScreen = () => {
  // Declara e inicializa os estados usando useState
  const [currentValue, setCurrentValue] = useState('0'); // Armazena o valor atual da entrada do usuário
  const [previousValue, setPreviousValue] = useState(null); // Armazena o valor anterior antes de uma operação
  const [operator, setOperator] = useState(null); // Armazena o operador atual (+, -, *, /, etc.)
  const [isPercent, setIsPercent] = useState(false); // Estado para rastrear quando o botão de porcentagem é pressionado

  // Função para formatar números de acordo com a localidade 'pt-BR' (Brasil), adicionando pontos e vírgulas apropriadas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  // Função handlePress para lidar com a lógica de botões pressionados
  const handlePress = (label) => {
    if (!isNaN(label)) { // Verifica se o label é um número (não é NaN)
      // Se for um número, atualiza o valor atual concatenando-o com o anterior, a menos que o valor atual seja '0'
      setCurrentValue((prev) => (prev === '0' ? label : prev + label));
    } else if (label === 'C') { // Limpa a calculadora
      setCurrentValue('0'); // Reseta o valor atual para '0'
      setPreviousValue(null); // Reseta o valor anterior
      setOperator(null); // Reseta o operador
      setIsPercent(false); // Reseta o estado de porcentagem
    } else if (label === '=') { // Calcula o resultado final
      if (operator && previousValue) { // Verifica se há um operador e um valor anterior
        const result = calculate(Number(previousValue), Number(currentValue), operator, isPercent); // Chama a função de cálculo
        setCurrentValue(formatNumber(result)); // Define o valor atual como o resultado formatado
        setPreviousValue(null); // Reseta o valor anterior
        setOperator(null); // Reseta o operador
        setIsPercent(false); // Reseta o estado de porcentagem
      }
    } else if (label === '%') { // Calcula porcentagem
      if (operator && previousValue) { // Verifica se há um operador e um valor anterior
        const result = calculate(Number(previousValue), Number(currentValue), operator, true); // Calcula a porcentagem do valor anterior
        setCurrentValue(formatNumber(result)); // Define o valor atual como o resultado formatado
        setPreviousValue(null); // Reseta o valor anterior
        setOperator(null); // Reseta o operador
        setIsPercent(false); // Reseta o estado de porcentagem
      } else {
        setCurrentValue((prev) => String(Number(prev) / 100)); // Converte o valor atual em uma porcentagem
      }
    } else if (label === '.') { // Adiciona ponto decimal
      if (!currentValue.includes('.')) { // Verifica se o ponto decimal já não está presente
        setCurrentValue((prev) => prev + '.'); // Adiciona o ponto decimal ao valor atual
      }
    } else if (label === '√') { // Calcula raiz quadrada
      setCurrentValue(formatNumber(Math.sqrt(Number(currentValue)))); // Define o valor atual como a raiz quadrada do valor atual formatada
    } else if (label === '^') { // Preparar para potenciação
      setPreviousValue(currentValue); // Define o valor atual como valor anterior
      setCurrentValue('0'); // Reseta o valor atual para '0'
      setOperator(label); // Define o operador para '^' (potenciação)
      setIsPercent(false); // Reseta o estado de porcentagem
    } else if (label === 'log') { // Calcula logaritmo base 10
      setCurrentValue(formatNumber(Math.log10(Number(currentValue)))); // Define o valor atual como o logaritmo base 10 do valor atual formatado
    } else { // Lógica para operadores (+, -, *, /)
      setPreviousValue(currentValue); // Define o valor atual como valor anterior
      setCurrentValue('0'); // Reseta o valor atual para '0'
      setOperator(label); // Define o operador atual
      setIsPercent(false); // Reseta o estado de porcentagem
    }
  };

  // Função de cálculo, realiza operações baseadas no operador e se é porcentagem
  const calculate = (a, b, operator, isPercent) => {
    if (isPercent) { // Se a operação envolve porcentagem
      b = (a * b) / 100; // Calcula a porcentagem do valor anterior
    }
    // Switch-case para realizar operações matemáticas com base no operador
    switch (operator) {
      case '+': // Adição
        return a + b;
      case '-': // Subtração
        return a - b;
      case '*': // Multiplicação
        return a * b;
      case '/': // Divisão
        return b !== 0 ? a / b : 'Error'; // Verificando divisão por zero
      case '√': // Raiz quadrada
        return Math.sqrt(a); // Calcula a raiz quadrada de 'a'
      case '^': // Potenciação
        return Math.pow(a, b); // Calcula a potenciação de 'a' elevado a 'b'
      case 'log': // Logaritmo base 10
        return Math.log10(a); // Calcula o logaritmo base 10 de 'a'
      default:
        return 0; // Retorna 0 por padrão se o operador não for reconhecido
    }
  };

  // Renderização da interface da calculadora
  return (
    <View style={styles.container}> 
      <Display value={currentValue} /> 
      <View style={styles.row}> 
        <Button label="C" onPress={handlePress} style={styles.clearButton} textStyle={styles.clearButtonText} />
        <Button label="/" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} /> 
        <Button label="*" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} /> 
        <Button label="-" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} />
      </View>
      <View style={styles.row}> 
        <Button label="7" onPress={handlePress} />
        <Button label="8" onPress={handlePress} /> 
        <Button label="9" onPress={handlePress} /> 
        <Button label="+" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} />
      </View>
      <View style={styles.row}> 
        <Button label="4" onPress={handlePress} /> 
        <Button label="5" onPress={handlePress} /> 
        <Button label="6" onPress={handlePress} /> 
        <Button label="√" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} />  
      </View>
      <View style={styles.row}> 
        <Button label="1" onPress={handlePress} /> 
        <Button label="2" onPress={handlePress} /> 
        <Button label="3" onPress={handlePress} /> 
        <Button label="%" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} /> 
      </View>
      <View style={styles.row}> 
        <Button label="." onPress={handlePress} /> 
        <Button label="0" onPress={handlePress} />
        <Button label="=" onPress={handlePress} style={styles.equalButton} textStyle={styles.equalButtonText} />
        
        <Button label="^" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} /> 
        <Button label="log" onPress={handlePress} style={styles.operatorButton} textStyle={styles.operatorButtonText} />
      </View>
    </View>
  );
};

// Estilos para o componente da calculadora, utilizando StyleSheet do React Native
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz o contêiner ocupar todo o espaço disponível
    backgroundColor: '#000', // Define a cor de fundo preta
    padding: 10, // Adiciona padding de 10 unidades
  },
  row: {
    flexDirection: 'row', // Define a direção dos filhos para linha 
    justifyContent: 'space-between', // Distribui os filhos com espaço igual entre eles 
    marginVertical: 5, // Adiciona uma margem vertical de 5 unidades 
  }, 
  clearButton: { 
    backgroundColor: '#FF6666', // Define a cor de fundo do botão "C" como vermelho menos intenso
  }, 
  clearButtonText: { 
    color: '#fff', // Define a cor do texto do botão "C" como branco 
  },
  operatorButton: {
    backgroundColor: '#A9A9A9',
  },
  operatorButtonText: {
    color: '#000',
  },
  equalButton: { 
    backgroundColor: '#808080', 
  },
  equalButtonText: { 
    color: '#000', // Texto preto para melhor contraste 
  },
}); 
  
  export default CalculatorScreen

/*
DEBUGANDO O CÓDIGO:
Importações:

React e useState: Importa o React e o hook useState que permite gerenciar o estado no componente funcional.

Componentes do React Native: Importa os componentes View e StyleSheet do React Native.

Componentes Button e Display: Importa os componentes personalizados Button e Display do diretório de componentes.

Estados:

currentValue: Armazena o valor atual que está sendo digitado ou calculado.

previousValue: Armazena o valor anterior antes de uma operação.

operator: Armazena o operador atual, como +, -, *, /, etc.

isPercent: Rastrea se a operação de porcentagem está ativa.

Função formatNumber:

Formata números de acordo com a localidade pt-BR, adicionando pontos e vírgulas apropriadas.

Função handlePress:

Lida com a lógica de botões pressionados:

Números: Atualiza o currentValue concatenando o número pressionado.

C: Reseta todos os estados (currentValue, previousValue, operator, isPercent).

=: Calcula o resultado final chamando a função calculate.

%: Calcula a porcentagem do valor atual ou anterior.

. Adiciona um ponto decimal ao currentValue se ele ainda não tiver um.

√: Calcula a raiz quadrada do currentValue.

^: Prepara para uma operação de potenciação, armazenando o currentValue em previousValue e resetando currentValue.

log: Calcula o logaritmo base 10 do currentValue.

*Operadores (+, -, , /): Prepara para uma operação aritmética, armazenando o currentValue em previousValue e resetando currentValue.

Função calculate:

Parâmetros: Recebe os valores a e b, o operador (operator) e um booleano que indica se é uma operação percentual (isPercent).

Cálculo de Porcentagem: Se isPercent for verdadeiro, ajusta b para ser a porcentagem de a antes de continuar.

Switch-Case: Executa diferentes operações matemáticas baseadas no operador:

Adição (+): Retorna a soma de a e b.

Subtração (-): Retorna a diferença entre a e b.

Multiplicação (*): Retorna o produto de a e b.

Divisão (/): Retorna o quociente de a e b, verificando se b não é zero para evitar divisão por zero.

Raiz Quadrada (√): Retorna a raiz quadrada de a.

Potenciação (^): Retorna a elevado à potência de b.

Logaritmo (log): Retorna o logaritmo base 10 de a.

Default: Retorna 0 se o operador não for reconhecido.

Renderização da Interface:

View Principal (<View style={styles.container}>): Contêiner principal da calculadora.

Display do Valor Atual (<Display value={currentValue} />): Componente de display para mostrar o valor atual.

Linhas de Botões (<View style={styles.row}>):

Botões de Operadores e Dígitos: Organiza os botões em linhas, cada uma contendo vários botões com diferentes funções (números, operadores, limpar, igual, porcentagem, ponto decimal, raiz quadrada, potenciação, logaritmo).

Estilos (styles):

Container: Estilo para o contêiner principal, ocupando todo o espaço disponível com um fundo preto e padding de 10 unidades.

Row: Estilo para as linhas de botões, alinhando os filhos em uma linha com espaço igual entre eles e uma margem vertical de 5 unidades.

Exportação:

Exporta CalculatorScreen como Componente Padrão: Permite que o componente CalculatorScreen seja importado e utilizado em outras partes do aplicativo.
*/




        





