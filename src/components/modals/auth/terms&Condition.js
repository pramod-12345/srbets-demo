import React, { useState } from "react";
import { backIcon } from "assets";
import {
    Typography,
    Seperator
} from "components"
import { setModalType } from "../../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

const RegisterTerms = () => {
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className="w-full">
            {/* Modal Header */}
            <div className="md:hidden bg-blackRussian">
                <div className="flex items-center justify-between px-4 gap-2 py-5">
                    <div className="flex items-center gap-2">
                        <img
                            src={backIcon}
                            alt="Back"
                            onClick={() => dispatch(setModalType("login"))}
                            className="cursor-pointer"
                            
                        />
                        <Typography
                            color={"white"}
                            variant={"size20Bold"}
                            content={"Register new account"}
                        />
                    </div>
                    <Typography
                        color={"vintageRibbon"}
                        variant={"size16Medium"}
                        content={"Step 2 of 2"}
                    />
                </div>
                <Seperator />
            </div>
            <div className="hidden md:block">
                <div className="flex items-center gap-2 py-2">
                    <Typography
                        color={"white"}
                        variant={"size20Bold"}
                        content={"Register new account"}
                    />
                    <Typography
                        color={"vintageRibbon"}
                        variant={"size16Medium"}
                        content={"Step 2 of 2"}
                    />
                </div>
            </div>
            <p className="text-vintageRibbon text-[16px] mt-5 px-4 lg:px-0 md:mt-0 leading-[21px] font-medium">
                Read and accept the terms & conditions
            </p>

            {/* Content */}
            <div className="space-y-6 mt-10 px-4 lg:px-0 max-h-[500px] w-fit whitspace-wrap overflow-y-auto scrollbar-thin">
                <section>
                    <h3 className="text-white text-[16px] leading-[21px] font-bold mb-3.5">Complaints</h3>
                    <ul className="text-vintageRibbon text-sm font-normal leading-[21px] list-disc ml-5 space-y-2">
                        <li>
                            28.3 Nothing in this Agreement shall create or be deemed to
                            create a partnership, agency, trust arrangement, fiduciary
                            relationship, or joint venture between you and Stake.
                        </li>
                        <li>
                            28.4 Stake may assign, transfer, charge, sub-license, or deal in
                            any other manner with this Agreement, or sub-contract any of its
                            rights and obligations under this Agreement, to any other party.
                        </li>
                        <li>
                            28.5 This Agreement constitutes the entire understanding and
                            agreement between you and Stake regarding the Service and
                            supersedes any prior agreement, understanding, or arrangement
                            between you and Stake.
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white text-[16px] leading-[21px] font-bold mb-3.5">Heading here</h3>
                    <ul className="text-gray-400 text-sm list-disc ml-5 space-y-2">
                        <li>
                            28.3 Nothing in this Agreement shall create or be deemed to
                            create a partnership, agency, trust arrangement, fiduciary
                            relationship, or joint venture between you and Stake.
                        </li>
                        <li>
                            28.4 Stake may assign, transfer, charge, sub-license, or deal in
                            any other manner with this Agreement, or sub-contract any of its
                            rights and obligations under this Agreement, to any other party.
                        </li>
                        <li>
                            28.5 This Agreement constitutes the entire understanding and
                            agreement between you and Stake regarding the Service and
                            supersedes any prior agreement, understanding, or arrangement
                            between you and Stake.
                        </li>
                    </ul>
                </section>
            </div>

            {/* Checkbox and Button */}
            <div className="mt-6 px-4 lg:px-0">
                <label className="flex items-center space-x-2 text-sm text-gray-400">
                    <input
                        type="checkbox"
                        className="w-4 h-4 text-primary rounded focus:ring-primary"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <span>I have read and agree to the terms and conditions</span>
                </label>
                <button
                    onClick={() => { dispatch(setModalType('authoriseRegistration')) }}
                    disabled={!isChecked}
                    className={`w-full mt-4 py-2 text-white rounded-lg ${isChecked
                        ? "bg-primary"
                        : "bg-primary-disabled cursor-not-allowed"
                        }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default RegisterTerms;
