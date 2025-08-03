import { StoreLayerTypeValueObject } from "@/domain/report-geoserver";

describe("StoreLayerTypeValueObject", () => {
	it("should return InvalidStoreLayerTypeValueObjectError for an invalid store layer type (null)", () => {
		const invalidStoreLayerType = null;

		expect(() => StoreLayerTypeValueObject.create(invalidStoreLayerType)).toThrow();
	});

	it("should return InvalidStoreLayerTypeValueObjectError for an invalid store layer type (number)", () => {
		const invalidStoreLayerType = 123;

		expect(() => StoreLayerTypeValueObject.create(invalidStoreLayerType as unknown as string)).toThrow();
	});

	it("should return InvalidStoreLayerTypeValueObjectError for an invalid store layer type (empty string)", () => {
		const invalidStoreLayerType = "";

		expect(() => StoreLayerTypeValueObject.create(invalidStoreLayerType)).toThrow();
	});

	it("should return InvalidStoreLayerTypeValueObjectError for an invalid store layer type (string with length > 50)", () => {
		const invalidStoreLayerType = "c".repeat(51);

		expect(() => StoreLayerTypeValueObject.create(invalidStoreLayerType)).toThrow();
	});

	it("should create a StoreLayerTypeValueObject instance with a valid store layer type", () => {
		const validStoreLayerType = "ValidType";

		const sut = StoreLayerTypeValueObject.create(validStoreLayerType);

		expect(sut).toBeInstanceOf(StoreLayerTypeValueObject);
	});
});
