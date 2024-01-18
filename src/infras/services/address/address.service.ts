import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { IAddressService } from "src/core/contracts/address/address.service";

@Injectable()
export class AddressService implements IAddressService{
    constructor(private readonly httpService: HttpService){}
    async translaterCoordinatesToAddress(latitude: number, longitude: number): Promise<string> {
        let url = process.env.GEOCODE_URL_REVERSE;
        url = url + `lat=${latitude}&lon=${longitude}&api_key=${process.env.GEOCODE_API_KEY}`;
        const address = await this.httpService.axiosRef.get(url);
        return address.data.display_name;
    }
}