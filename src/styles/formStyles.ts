import { StyleSheet } from 'react-native';

export const formStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#fafafa',
    },
    pickerBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 15,
    },
});
