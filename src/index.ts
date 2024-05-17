import { GenerateHashTokenModel, ResponseRequestModel } from './models/index';
import * as cryptoJS from 'crypto-js';
import crypto from 'crypto';

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  console.log("return: " + a + b);
  return a + b;
};

export const generateHashToken = (
    informationRequest: GenerateHashTokenModel,
    onSuccess: (response: ResponseRequestModel) => void,
    onError: (response: ResponseRequestModel) => void
) => {

    if (informationRequest.eventId != '' && informationRequest.memberId != '' && informationRequest.mode != '') {
        var tokenHash: any;
        const jsonObject = {
            eventId: informationRequest.eventId,
            memberId: informationRequest.memberId,
            mode: informationRequest.mode,
            allowedHolds: [],
            appViewOnly: true,
            allowIconsEdit: false,
            allowOrphanSale: false,
            featureFlags: {
                wholeTableBooking: true,
                orphanSeats: true,
            },
        };

        const jsonString = JSON.stringify(jsonObject);
        tokenHash = window.btoa(jsonString);
        const hash = cryptoJS.HmacSHA256(tokenHash, 'b34c1b1fadb75d5517e30a1a9a81eb72');
        const signature = tokenHash + "." + hash.toString(cryptoJS.enc.Hex);
        var responseRequest: ResponseRequestModel = {
            code: 'TRX001',
            message: '',
            data: signature
        }
        onSuccess(responseRequest);
    } else {
        const responseRequest: ResponseRequestModel = {
            code: 'TRX002',
            message: '',
            data: ''
        }
        onError(responseRequest);
    }

}

export const generateRandomId = (
    generateById: string,
    onSuccess: (response: ResponseRequestModel) => void,
    onError: (response: ResponseRequestModel) => void
) => {

    if (generateById != '') {

        const uuid = crypto.randomUUID();
        const splitUuid = uuid.split('-');
        const id = generateById + '_' + splitUuid[0];

        var responseRequest: ResponseRequestModel = {
            code: 'TRX001',
            message: 'Se ha generado satisfactoriamente el ID.',
            data: id
        }
        onSuccess(responseRequest);

    } else {
        const responseRequest: ResponseRequestModel = {
            code: 'TRX002',
            message: 'Error deberá enviar un valor válido',
            data: ''
        }
        onError(responseRequest);
    }

}