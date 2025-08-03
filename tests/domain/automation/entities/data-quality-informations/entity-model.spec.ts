import { DataQualityInformationsEntityModel } from "@/domain/automation";

describe("DataQualityInformationsEntityModel", () => {
	it("should return an error if qualityInformationsId is invalid", () => {
		const invalidQualityInformationsId = -1;
		const dataProvidersId = 2;
		const validDisturbancesDescription = "No disturbances";
		const validIdentifiedAt = new Date("2023-01-01T12:00:00Z");
		const validTimeOfDelay = new Date("2023-01-01T12:30:00Z");
		const wasDelay = true;

		expect(() => DataQualityInformationsEntityModel.create(
			{
				qualityInformationsId: invalidQualityInformationsId, 
				dataProvidersId: dataProvidersId, 
				disturbancesDescription: validDisturbancesDescription, 
				identifiedAt: validIdentifiedAt, 
				timeOfDelay: validTimeOfDelay, 
				wasDelay: wasDelay
			} 
		)).toThrow();
	});

	it("should return an error if dataProvidersId is invalid", () => {
		const qualityInformationsId = 1;
		const invalidDataProvidersId = -2;
		const validDisturbancesDescription = "No disturbances";
		const validIdentifiedAt = new Date("2023-01-01T12:00:00Z");
		const validTimeOfDelay = new Date("2023-01-01T12:30:00Z");
		const wasDelay = true;

		expect(() => DataQualityInformationsEntityModel.create(
			{
				qualityInformationsId: qualityInformationsId, 
				dataProvidersId: invalidDataProvidersId, 
				disturbancesDescription: validDisturbancesDescription, 
				identifiedAt: validIdentifiedAt, 
				timeOfDelay: validTimeOfDelay, 
				wasDelay: wasDelay
			} 
		)).toThrow();
	});

	it("should return an error if disturbancesDescription is invalid", () => {
		const qualityInformationsId = 1;
		const dataProvidersId = 2;
		const invalidDisturbancesDescription = "";
		const validIdentifiedAt = new Date("2023-01-01T12:00:00Z");
		const validTimeOfDelay = new Date("2023-01-01T12:30:00Z");
		const wasDelay = true;

		expect(() => DataQualityInformationsEntityModel.create(
			{
				qualityInformationsId: qualityInformationsId, 
				dataProvidersId: dataProvidersId, 
				disturbancesDescription: invalidDisturbancesDescription, 
				identifiedAt: validIdentifiedAt, 
				timeOfDelay: validTimeOfDelay, 
				wasDelay: wasDelay
			} 
		)).toThrow();
	});

	it("should create a DataQualityInformationsEntityModel instance with valid values", () => {
		const qualityInformationsId = 1;
		const dataProvidersId = 2;
		const validDisturbancesDescription = "No disturbances";
		const validIdentifiedAt = new Date("2023-01-01T12:00:00Z");
		const validTimeOfDelay = new Date("2023-01-01T12:30:00Z");
		const wasDelay = true;

		const sut = DataQualityInformationsEntityModel.create(
			{
				qualityInformationsId: qualityInformationsId, 
				dataProvidersId: dataProvidersId, 
				disturbancesDescription: validDisturbancesDescription, 
				identifiedAt: validIdentifiedAt, 
				timeOfDelay: validTimeOfDelay, 
				wasDelay: wasDelay
			} 
		) as DataQualityInformationsEntityModel;

		expect(sut).toBeInstanceOf(DataQualityInformationsEntityModel);
		expect(sut.qualityInformationsId.value).toBe(qualityInformationsId);
		expect(sut.dataProvidersId.value).toBe(dataProvidersId);
		expect(sut.disturbancesDescription.value).toBe(validDisturbancesDescription);
		expect(sut.identifiedAt).toEqual(validIdentifiedAt);
		expect(sut.timeOfDelay).toEqual(validTimeOfDelay);
		expect(sut.wasDelay).toBe(wasDelay);
	});
});
