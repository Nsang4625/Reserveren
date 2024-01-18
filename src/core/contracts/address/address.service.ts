export abstract class IAddressService {
    abstract translaterCoordinatesToAddress(latitude: number, longitude: number): Promise<string>;
}