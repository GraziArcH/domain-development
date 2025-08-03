import { StoreLayerNameValueObject } from "@/domain/report-geoserver";

describe("StoreLayerNameValueObject", () => {
	it("should return InvalidStoreLayerNameValueObjectError for an invalid store layer name (null)", () => {
		const invalidStoreLayerName = null;

		expect(() => StoreLayerNameValueObject.create(invalidStoreLayerName)).toThrow();
	});

	it("should return InvalidStoreLayerNameValueObjectError for an invalid store layer name (number)", () => {
		const invalidStoreLayerName = 123;

		expect(() => StoreLayerNameValueObject.create(invalidStoreLayerName as unknown as string)).toThrow();
	});

	it("should return InvalidStoreLayerNameValueObjectError for an invalid store layer name (empty string)", () => {
		const invalidStoreLayerName = "";

		expect(() => StoreLayerNameValueObject.create(invalidStoreLayerName)).toThrow();
	});

	it("should return InvalidStoreLayerNameValueObjectError for an invalid store layer name (string with length > 255)", () => {
		const invalidStoreLayerName = "c".repeat(256);

		expect(() => StoreLayerNameValueObject.create(invalidStoreLayerName)).toThrow();
	});

	it("should create a StoreLayerNameValueObject instance with a valid store layer name", () => {
		const validStoreLayerName = "ValidStoreLayerName";

		const sut = StoreLayerNameValueObject.create(validStoreLayerName);

		expect(sut).toBeInstanceOf(StoreLayerNameValueObject);
	});
});
