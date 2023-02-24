import React from 'react';
import {useSelector} from "react-redux";
import StackedBar from "../../components/graphics/Chartjs";
import PieChart from "../../components/graphics/Pie";
import {map, size} from "lodash";
import Skeleton from "react-loading-skeleton";
import {BellIcon} from "@heroicons/react/24/outline";
import {CheckIcon} from "@heroicons/react/24/solid";
import Humanize from "humanize-plus";
import Table from "./Table";

const Cost = () => {

    const count_failures = useSelector(state => state.Graphics.count_fail)
    const count_physical = useSelector(state => state.Graphics.count_physical)
    const count_fixed = useSelector(state => state.Graphics.count_fixed)
    const count_type = useSelector(state => state.Graphics.count_type)
    const cost_day = useSelector(state => state.Graphics.cost_day)
    const cost_user = useSelector(state => state.Graphics.cost_user)
    const cost_material = useSelector(state => state.Graphics.cost_material)
    const total_ot = useSelector(state => state.Graphics.total_ot)


    return (

        <div
            className={"bg-white w-full  rounded-xl p-2 h-screen overflow-y-auto scrollbar-hide p-8"}>
            <div
                className={" w-12/12   rounded-xl p-2  scrollbar-hide   gap-6  flex justify-center items-center flex-wrap "}>
                <div
                    className={"md:w-3/12 w-full bg-white hover:translate-y-1 text-white shadow-lg h-max rounded-lg p-2 flex flex-col gap-2 border border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"}>
                    <span className={" text-xs font-sans"}>Costo mano de obra</span>
                    <div className={"flex items-center justify-between"}>
                        <span className={""}>S/{Humanize.formatNumber(cost_user, 2)}</span>
                        <BellIcon className={"h-5 w-5  bg-blue-700 bg-opacity-10 rounded-full p-0.5"}/>
                    </div>

                </div>
                <div
                    className={"md:w-3/12 w-full bg-white hover:translate-y-1 text-white shadow-lg h-max rounded-lg p-2 flex flex-col gap-2 border border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"}>
                    <span className={"   text-xs font-sans"}>Costo materiales</span>
                    <div className={"flex items-center justify-between"}>
                        <span className={""}>S/{Humanize.formatNumber(cost_material, 2)}</span>
                        <CheckIcon className={"h-5 w-5  bg-blue-700 bg-opacity-10 rounded-full p-0.5"}/>
                    </div>

                </div>
            </div>

            <div className={"h-screen  w-full gap-12  flex flex-row justify-center flex-wrap items-center "}>

                <div className={"w-full lg:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_failures && size(count_failures) > 0 ?
                        <PieChart labels={map(count_failures, item => item?.label)}
                                  data={map(count_failures, item => item?.cost)}
                                  background={map(count_failures, item => item?.backgroundColor)}
                                  title={"Costo de fallas"}/> : <Skeleton count={20}/>}
                </div>
                <div className={"w-full lg:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_type && size(count_type) > 0 ? <PieChart labels={map(count_type, item => item?.label)}
                                                                    data={map(count_type, item => item?.cost)}
                                                                    background={map(count_type, item => item?.backgroundColor)}
                                                                    title={"Costo de mantenimiento"}/> :
                        <Skeleton count={20}/>}
                </div>
                <div className={"w-full lg:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_physical && size(count_physical) > 0 ?
                        <PieChart labels={map(count_physical, item => item?.label)}
                                  data={map(count_physical, item => item?.cost)}
                                  background={map(count_physical, item => item?.backgroundColor)}
                                  title={"Costo por equipos"}/> :
                        <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full lg:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_fixed && size(count_fixed) > 0 ? <PieChart labels={map(count_fixed, item => item?.label)}
                                                                      data={map(count_fixed, item => item?.cost)}
                                                                      background={map(count_fixed, item => item?.backgroundColor)}
                                                                      title={"Costo por ubicaciones"}/> :
                        <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full  lg:w-6/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    <StackedBar labels={['Dia']} data={cost_day} title={"Costo por dia"}/>
                </div>
                <div className={"w-full  shadow-lg h-max rounded-lg p-2 t-16"}>
                    <Table total_ot={total_ot}/>
                </div>

            </div>

        </div>

    );
};

export default Cost;
