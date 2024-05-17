# Librería NPM para obtener el Hash en Base64

Esta librería está realizada en TSDX, esta se usa para generar un hash con información dinámica y retornar el hash.

# Instalación de librería

'''sh
npm i hash-token-map-generate
'''

# Uso

## Generar HashMap

'''sh

// Importación de la librería
import { generateHashToken } from 'hash-token-map-generate';


function generateHashMap() {

    var request: GenerateHashTokenModel = {
      eventId: "1234",
      memberId: "1234",
      mode: "picker" // edit | inventory | picker
    }

    generateHashToken(
        request,
        (success) => {
            console.log(success);
        },
        (error) => {
            console.log(error);
        }
    );

}


'''