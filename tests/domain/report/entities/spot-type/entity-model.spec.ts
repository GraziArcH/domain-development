import { SpotTypeEntityModel } from "@/domain/report";

describe("SpotTypeEntityModel", () => {
	it("should throw an error if spotTypeId is invalid", () => {
		const invalidSpotTypeId = 0;
		const validSpotTypeName = "TypeName";
		const validDescription = "Description";
		const validActive = true;
		const validCreatedBy = 1;
		const validSpotData = {};		

		expect(() => {
			SpotTypeEntityModel.create({
				spotTypeId: invalidSpotTypeId,
				spotTypeName: validSpotTypeName,
				description: validDescription,
				active: validActive,
				createdBy: validCreatedBy,
				spotData: validSpotData
			});
		}).toThrow();
	});

	it("should throw an error if spotTypeName is invalid", () => {
		const validSpotTypeId = 1;
		const invalidSpotTypeName = "c".repeat(300);
		const validDescription = "Description";
		const validActive = true;
		const validCreatedBy = 1;
		const validSpotData = {};		

		expect(() => {
			SpotTypeEntityModel.create({
				spotTypeId: validSpotTypeId,
				spotTypeName: invalidSpotTypeName,
				description: validDescription,
				active: validActive,
				createdBy: validCreatedBy,
				spotData: validSpotData
			});
		}).toThrow();
	});

	it("should throw an error if description is invalid", () => {
		const validSpotTypeId = 1;
		const validSpotTypeName = "TypeName";
		const invalidDescription = "c".repeat(300);
		const validActive = true;
		const validCreatedBy = 1;
		const validSpotData = {};		

		expect(() => {
			SpotTypeEntityModel.create({
				spotTypeId: validSpotTypeId,
				spotTypeName: validSpotTypeName,
				description: invalidDescription,
				active: validActive,
				createdBy: validCreatedBy,
				spotData: validSpotData
			});
		}).toThrow();
	});

	it("should create a SpotTypeEntityModel instance with valid values", () => {
		const validSpotTypeId = 1;
		const validSpotTypeName = "TypeName";
		const validDescription = "Description";
		const validActive = true;
		const validCreatedBy = 1;
		const validSpotData = {};		

		const sut = SpotTypeEntityModel.create({
			spotTypeId: validSpotTypeId,
			spotTypeName: validSpotTypeName,
			description: validDescription,
			active: validActive,
			createdBy: validCreatedBy,
			spotData: validSpotData
		});

		expect(sut).toBeInstanceOf(SpotTypeEntityModel);
	});
});
