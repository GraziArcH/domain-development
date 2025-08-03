import { WorkspaceEntityModel } from "@/domain/report-geoserver";

describe("WorkspaceEntityModel", () => {
    it("should return an error if id is invalid", () => {
        const invalidId = -1;
        const validName = "Valid name";
        const validDescription = "Valid description";

        expect(() => WorkspaceEntityModel.create({
            id: invalidId,
            name: validName,
            description: validDescription
        })).toThrow(Error);
    });

    it("should return an error if name is invalid", () => {
        const validId = 1;
        const invalidName = "";
        const validDescription = "Valid description";

        expect(() => WorkspaceEntityModel.create({
            id: validId,
            name: invalidName,
            description: validDescription
        })).toThrow(Error);
    });

    it("should create a WorkspaceEntityModel instance with valid values", () => {
        const validId = 1;
        const validName = "Valid name";
        const validDescription = "Valid description";

        const sut = WorkspaceEntityModel.create({
            id: validId,
            name: validName,
            description: validDescription
        }) as WorkspaceEntityModel;

        expect(sut).toBeInstanceOf(WorkspaceEntityModel);
    });
});
