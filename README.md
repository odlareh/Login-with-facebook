# Autenticación con NodeJS & PassportJS

Pequeño proyecto en NodeJS con PassportJS que permite la autenticación
de usuario con Facebook.

## Autenticación

Para que la `Autenticación` funcione correctamente se debe crear un archivo 
llamado `service_provider.js` ubicado en la raiz del proyecto, en el cual se 
debe declarar un objeto con el API Key y API Secret entregado por el ambiente 
de desarrolladores de Facebook. El formato del objeto debe ser de la siguiente
forma:

```
const service = {
    facebook: {
        clientID: 'FACEBOOK_CONSUMER_KEY',
        clientSecret: 'FACEBOOK_CONSUMER_SECRET'
    }
}

module.exports = service;
```
