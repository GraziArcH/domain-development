import { 
	ICustomSpotRepository, 
	CustomSpotEntityModel,
	CustomSpotEntity, 
	CustomSpotDTOWithoutIdAndOrder, 
	CustomSpotDTO 
} from "@/domain/report";

describe("CustomSpotEntity", () => {
	let mockRepository: ICustomSpotRepository;
	let customSpotEntity: CustomSpotEntity;
	const mockEntityModel = CustomSpotEntityModel.create({
		customSpotId: 1,
		order: 1,
		filters: '{}',
		spotTemplateName: "Name",
		userId: 1
	} as CustomSpotDTO);

	beforeEach(() => {
		mockRepository = {
			create: jest.fn(),
			getByUserId: jest.fn(),
			getById: jest.fn(),
			delete: jest.fn(),
			getBySpotNameAndFilter: jest.fn()
		};

		customSpotEntity = new CustomSpotEntity(mockRepository);
	});

	describe("create", () => {
		it("should return Error for an invalid entity model", async () => {
			await expect(async () => {
				await customSpotEntity.create({
					userId: -1,
					order: 1,
					filters: '{}',
					spotTemplateName: ""
				} as CustomSpotDTOWithoutIdAndOrder);
			}).rejects.toThrow();
		});

		it("should create custom spot", async () => {
			jest.spyOn(mockRepository, "create").mockResolvedValueOnce(mockEntityModel);

			const result = await customSpotEntity.create({
				userId: 1,
				order: 1,
				filters: '{}',
				spotTemplateName: "Name"
			} as CustomSpotDTOWithoutIdAndOrder);

			expect(result).toEqual(mockEntityModel);
		});
	});

	describe("getByUserId", () => {
		it("should return Error for an invalid user id", async () => {
			await expect(customSpotEntity.getByUserId(0)).rejects.toThrow();
		});
	});

	describe("delete", () => {
		it("should return Error for an invalid custom spot id", async () => {
			await expect(customSpotEntity.delete(0)).rejects.toThrow();
		});

		it("should return Error for a non-existing custom spot", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(null);

			await expect(customSpotEntity.delete(1)).rejects.toThrow();
		});

		it("should delete custom spot", async () => {
			jest.spyOn(mockRepository, "getById").mockResolvedValueOnce(mockEntityModel);
			jest.spyOn(mockRepository, "delete").mockResolvedValueOnce(mockEntityModel);

			const result = await customSpotEntity.delete(1);

			expect(result).toEqual(mockEntityModel);
		});
	});
});