import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  loginWindowBGStyle: {
    backgroundColor: '#125653',
    width: '100%',
    height: '100%',
  },
  loginTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#FFF',
  },
  text_input: {
    width: 280,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  buttonArea: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 15,
  },
  loginButtonText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  clearButtonText: {
    color: '#74787b',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },

  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: '#fff',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
});

const colours = {
  bgcolor: '#125653',
};

export {styles, colours};
