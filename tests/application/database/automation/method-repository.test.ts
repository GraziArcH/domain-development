import { DatabaseHelper, MockMethodologyRepository, MethodRepository } from "@/application/framework";
import { MethodEntityModel } from "@/domain/automation";
import { IdValueObject } from "@/domain/shared";

describe("MethodRepository", () => {
	const databaseHelper = new DatabaseHelper("methodology");
	const mockMethodologyRepository = new MockMethodologyRepository(databaseHelper);

	beforeEach(async () => {
		await databaseHelper.connect();
		mockMethodologyRepository.createMocks();
	});

	afterEach(async () => {
		await mockMethodologyRepository.clearTables();
		await databaseHelper.disconnect();
	});

	describe("create", () => {
		it("should create a new method", async () => {
			const methodRepository = new MethodRepository(databaseHelper);
			const method = MethodEntityModel.create(
				{
					methodId: 1, 
					onsMethodologyId: 1, 
					methodDescription: "Test Method", 
					residue: "Test Residue", 
					skill: "Test Skill", 
					errorMeasurements: 10
				}
			) as MethodEntityModel;
	
			const result = await methodRepository.create(method);
	
			expect(result).toBeInstanceOf(MethodEntityModel);
		});
	});

	describe("getById", () => {
		it("should get null", async () => {
			const methodRepository = new MethodRepository(databaseHelper);
			const methodId = IdValueObject.create(999) as IdValueObject;
	
			const result = await methodRepository.getById(methodId);
	
			expect(result).toBeNull();
		});
	
		it("should get method by ID", async () => {
			const methodRepository = new MethodRepository(databaseHelper);
			const methodId = IdValueObject.create(1) as IdValueObject;
	
			const result = await methodRepository.getById(methodId);
	
			expect(result).toBeInstanceOf(MethodEntityModel);
		});
	});

	describe("getAll", () => {
		it("should get all methods", async () => {
			const methodRepository = new MethodRepository(databaseHelper);
	
			const result = await methodRepository.getAll();
	
			expect(result).toBeInstanceOf(Array);
		});		
	});

	describe("update", () => {
		it("should update method", async () => {
			const methodRepository = new MethodRepository(databaseHelper);
			const updatedMethod = MethodEntityModel.create(
				{
					methodId: 1, 
					onsMethodologyId: 1, 
					methodDescription: "Test Method", 
					residue: "Test Residue", 
					skill: "Test Skill", 
					errorMeasurements: 10
				}
			) as MethodEntityModel;
	
			const result = await methodRepository.update(updatedMethod);
	
			expect(result).toBeInstanceOf(MethodEntityModel);
		});
	});

	describe("delete", () => {
		it("should delete method", async () => {
			const methodRepository = new MethodRepository(databaseHelper);
			const methodId = IdValueObject.create(1) as IdValueObject;
	
			const result = await methodRepository.delete(methodId);
	
			expect(result).toBeInstanceOf(MethodEntityModel);
		});
	});
});