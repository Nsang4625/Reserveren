import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";

@Module({
    imports: [HttpModule],
    providers: [AddressService],
    exports: [AddressService]
})
export class AddressServiceModule {}