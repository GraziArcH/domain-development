import { DataProviderEntityModel, DataProviderDTO } from "@/domain/data-acquisition";

describe("DataProviderEntityModel", () => {
	it("should return an error if dataProvidersId is invalid", () => {
		const invalidDataProvidersId = -1;
		const validProviderName = "Valid Provider";
		const validProviderDescription = "Valid provider description";

		expect(() => DataProviderEntityModel.create({
			dataProvidersId: invalidDataProvidersId,
			providerName: validProviderName,
			providerDescription: validProviderDescription,
		} as DataProviderDTO)).toThrow();
	});

	it("should return an error if providerName is invalid", () => {
		const dataProvidersId = 1;
		const invalidProviderName = "";
		const validProviderDescription = "Valid provider description";

		expect(() => DataProviderEntityModel.create({
			dataProvidersId: dataProvidersId,
			providerName: invalidProviderName,
			providerDescription: validProviderDescription,
		} as DataProviderDTO)).toThrow();
	});

	it("should return an error if providerDescription is invalid", () => {
		const dataProvidersId = 1;
		const validProviderName = "Valid Provider";
		const invalidProviderDescription = "";

		expect(() => DataProviderEntityModel.create({
			dataProvidersId: dataProvidersId,
			providerName: validProviderName,
			providerDescription: invalidProviderDescription,
		} as DataProviderDTO)).toThrow();
	});

	it("should create a DataProviderEntityModel instance with valid values", () => {
		const dataProvidersId = 1;
		const validProviderName = "Valid Provider";
		const validProviderDescription = "Valid provider description";

		const sut = DataProviderEntityModel.create({
			dataProvidersId: dataProvidersId,
			providerName: validProviderName,
			providerDescription: validProviderDescription,
		} as DataProviderDTO) as DataProviderEntityModel;

		expect(sut).toBeInstanceOf(DataProviderEntityModel);
		expect(sut.dataProvidersId.value).toBe(dataProvidersId);
		expect(sut.providerName.value).toBe(validProviderName);
		expect(sut.providerDescription.value).toBe(validProviderDescription);
	});
});
