import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true
});

export function validateXML(xml) {
    if (typeof xml !== 'string' || !xml.trim()) {
        throw new Error('XML vazio ou inválido.');
    }

    try {
        parser.parse(xml);
        return true;
    } catch (error) {
        throw new Error('XML malformado');
    }
}