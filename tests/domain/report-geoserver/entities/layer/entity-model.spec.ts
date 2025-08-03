import { LayerEntityModel } from "@/domain/report-geoserver";

describe("LayerEntityModel", () => {
    it("should return an error if id is invalid", () => {
        const invalidId = -1;
        const validIdStore = 1;
        const validIdWorkspace = 1;
        const validName = "Valid name";
        const validFileKey = "key";
        const validType = "Valid type";
        const validFilePath = "Valid file path";
        const validGeoserverResponseCode = 1;
        const validStatus = true;
        const validPersistedInStoreAt = new Date();
        const validSendToGeoserverAt = new Date();

        expect(() => LayerEntityModel.create({
            id: invalidId,
            idStore: validIdStore,
            idWorkspace: validIdWorkspace,
            fileKey: validFileKey,
            name: validName,
            type: validType,
            filePath: validFilePath,
            geoserverResponseCode: validGeoserverResponseCode,
            status: validStatus,
            persistedInStoreAt: validPersistedInStoreAt,
            sendToGeoserverAt: validSendToGeoserverAt
        })).toThrow(Error);
    });

    it("should return an error if name is invalid", () => {
        const validId = 1;
        const validIdStore = 1;
        const validIdWorkspace = 1;
        const invalidName = "";
        const validType = "Valid type";
        const validFileKey = "key";
        const validFilePath = "Valid file path";
        const validGeoserverResponseCode = 1;
        const validStatus = true;
        const validPersistedInStoreAt = new Date();
        const validSendToGeoserverAt = new Date();

        expect(() => LayerEntityModel.create({
            id: validId,
            idStore: validIdStore,
            idWorkspace: validIdWorkspace,
            name: invalidName,
            fileKey: validFileKey,
            type: validType,
            filePath: validFilePath,
            geoserverResponseCode: validGeoserverResponseCode,
            status: validStatus,
            persistedInStoreAt: validPersistedInStoreAt,
            sendToGeoserverAt: validSendToGeoserverAt
        })).toThrow(Error);
    });

    it("should create a LayerEntityModel instance with valid values", () => {
        const validId = 1;
        const validIdStore = 1;
        const validIdWorkspace = 1;
        const validName = "Valid name";
        const validFileKey = "key"
        const validType = "Valid type";
        const validFilePath = "Valid file path";
        const validGeoserverResponseCode = 1;
        const validStatus = true;
        const validPersistedInStoreAt = new Date();
        const validSendToGeoserverAt = new Date();

        const sut = LayerEntityModel.create({
            id: validId,
            idStore: validIdStore,
            idWorkspace: validIdWorkspace,
            name: validName,
            fileKey: validFileKey,
            type: validType,
            filePath: validFilePath,
            geoserverResponseCode: validGeoserverResponseCode,
            status: validStatus,
            persistedInStoreAt: validPersistedInStoreAt,
            sendToGeoserverAt: validSendToGeoserverAt
        }) as LayerEntityModel;

        expect(sut).toBeInstanceOf(LayerEntityModel);
    });
});
