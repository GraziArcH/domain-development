import { StoreLayerEntityModel } from "@/domain/report-geoserver";

describe("StoreLayerEntityModel", () => {
    it("should return an error if id is invalid", () => {
        const invalidId = -1;
        const validIdWorkspace = 1;
        const validName = "Valid name";
        const validDescription = "Valid description";
        const validType = "Valid type";
        const validEndpoint = "Valid endpoint";
        const validCreatedBy = 1;

        expect(() => StoreLayerEntityModel.create({
            id: invalidId,
            idWorkspace: validIdWorkspace,
            name: validName,
            description: validDescription,
            type: validType,
            endpoint: validEndpoint,
            createdBy: validCreatedBy
        })).toThrow(Error);
    });

    it("should return an error if name is invalid", () => {
        const validId = 1;
        const validIdWorkspace = 1;
        const invalidName = "";
        const validDescription = "Valid description";
        const validType = "Valid type";
        const validEndpoint = "Valid endpoint";
        const validCreatedBy = 1;

        expect(() => StoreLayerEntityModel.create({
            id: validId,
            idWorkspace: validIdWorkspace,
            name: invalidName,
            description: validDescription,
            type: validType,
            endpoint: validEndpoint,
            createdBy: validCreatedBy
        })).toThrow(Error);
    });

    it("should create a StoreLayerEntityModel instance with valid values", () => {
        const validId = 1;
        const validIdWorkspace = 1;
        const validName = "Valid name";
        const validDescription = "Valid description";
        const validType = "Valid type";
        const validEndpoint = "Valid endpoint";
        const validCreatedBy = 1;

        const sut = StoreLayerEntityModel.create({
            id: validId,
            idWorkspace: validIdWorkspace,
            name: validName,
            description: validDescription,
            type: validType,
            endpoint: validEndpoint,
            createdBy: validCreatedBy
        }) as StoreLayerEntityModel;

        expect(sut).toBeInstanceOf(StoreLayerEntityModel);
    });
});
