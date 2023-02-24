import React from 'react';
import {useSelector} from "react-redux";
import StackedBar from "../../components/graphics/Chartjs";
import PieChart from "../../components/graphics/Pie";
import {map, range, size} from "lodash";
import Skeleton from "react-loading-skeleton";
import {BellIcon} from "@heroicons/react/24/outline";
import {CheckIcon} from "@heroicons/react/24/solid";
import Humanize from "humanize-plus";
import {HorizontalBar} from "./HorizontalBar";
import Table from "./Table";

const KPI = () => {
    const count_failures = useSelector(state => state.Graphics.count_fail)
    const count_physical = useSelector(state => state.Graphics.count_physical)
    const count_fixed = useSelector(state => state.Graphics.count_fixed)
    const count_type = useSelector(state => state.Graphics.count_type)
    const count_total_ot = useSelector(state => state.Graphics.count_total_ot)
    const total_hours = useSelector(state => state.Graphics.total_hours)
    const total_days = useSelector(state => state.Graphics.total_days)
    const finished = useSelector(state => state.Graphics.ot_finished)
    const pending = useSelector(state => state.Graphics.ot_pending)
    const compliance = useSelector(state => state.Graphics.ot_compliance)
    const indicators = useSelector(state => state.Graphics.indicators)
    const total_ot = useSelector(state => state.Graphics.total_ot)



    return (

        <div
            className={"bg-white w-full  rounded-xl p-2 h-screen overflow-y-auto scrollbar-hide p-8"}>
            <div
                className={" w-12/12   rounded-xl p-2  scrollbar-hide   gap-6  flex justify-center items-center flex-wrap "}>
                <div
                    className={"md:w-3/12 w-full bg-white hover:translate-y-1 text-white shadow-lg h-max rounded-lg p-2 flex flex-col gap-2 border border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"}>
                    <span className={" text-xs font-sans"}>OTs pendientes</span>
                    <div className={"flex items-center justify-between"}>
                        <span className={""}>{pending}</span>
                        <BellIcon className={"h-5 w-5  bg-blue-700 bg-opacity-10 rounded-full p-0.5"}/>
                    </div>

                </div>
                <div
                    className={"md:w-3/12 w-full bg-white hover:translate-y-1 text-white shadow-lg h-max rounded-lg p-2 flex flex-col gap-2 border border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"}>
                    <span className={"   text-xs font-sans"}>OTs finalizados</span>
                    <div className={"flex items-center justify-between"}>
                        <span className={""}>{finished}</span>
                        <CheckIcon className={"h-5 w-5  bg-blue-700 bg-opacity-10 rounded-full p-0.5"}/>
                    </div>

                </div>
                <div
                    className={"md:w-3/12 w-full bg-white hover:translate-y-1  text-white shadow-lg h-max rounded-lg p-2 flex flex-col gap-2 border border-gray-200 bg-gradient-to-r from-cyan-500 to-blue-500"}>
                    <span className={" text-xs  font-sans"}>Cumplimiento</span>
                    <div className={"flex items-center justify-between"}>
                        <span className={""}>{Humanize.formatNumber(compliance, 2)} %</span>
                        <CheckIcon className={"h-5 w-5  bg-blue-700 bg-opacity-10 rounded-full p-0.5"}/>
                    </div>

                </div>
            </div>
            <div className={"h-screen  w-full gap-2  flex flex-row justify-center flex-wrap items-center "}>
                <div
                    className={"w-full  shadow-md  h-max rounded-lg p-2 overflow-x-auto scrollbar-hide flex justify-center"}>
                    <table className="rounded-full text-sm text-left text-gray-500 w-full  ">
                        <thead className="text-xs text-gray-700  bg-white ">
                        <tr className={"w-full bg-opacity-10 bg-blue-400  rounded-l-md border-2 border-b-[#4687f1]"}>
                            <th className={"w-max     text-xs font-bold text-center text-[#4687f1] whitespace-nowrap "}>Personal</th>
                            {total_days !== null && size(total_days) > 0 && map(total_days[0].data, (column, index) => (
                                <th key={index}
                                    className={"w-min    text-xs font-bold text-center text-[#4687f1] whitespace-nowrap scrollbar-hide "}>
                                    {column?.label}
                                </th>))}
                        </tr>
                        </thead>
                        <tbody>
                        {total_days !== null && size(total_days) > 0 ? map(total_days, (row, index) => (<tr key={index}
                                                                                                            className={"w-full overflow-x-auto  rounded-lg  border-b  hover:bg-blue-600 hover:bg-opacity-10"}>
                            <td className={"w-max text-xs font-semibold  text-gray-500  text-center whitespace-nowrap scrollbar-hide"}>
                                {row?.label}
                            </td>
                            {map(row?.data, (column, index) => (<td key={index}
                                                                    className={"w-max   text-xs font-light  text-gray-500 text-center whitespace-nowrap scrollbar-hide"}>
                                {column?.data}
                            </td>))}
                        </tr>)) : <tr>
                            {map(range(0, 15), (column, index) => (

                                <th key={index} className="px-6 py-3 text-center"><Skeleton
                                    className={"bg-red-500"}
                                    count={10}/>
                                </th>))}
                        </tr>}
                        </tbody>
                    </table>
                </div>
                <div className={"w-full md:w-5/12 sm:w-7/12 shadow-lg h-max rounded-lg p-2 "}>
                    {count_total_ot && size(count_total_ot) > 0 ?
                        <StackedBar labels={['Personal']} data={count_total_ot} title={"OT por trabajador"}/> :
                        <Skeleton count={20}/>}
                </div>
                <div className={"w-full md:w-3/12 sm:w-4/12 shadow-lg h-max rounded-lg p-2"}>
                    {count_total_ot && size(total_hours) > 0 ? <PieChart labels={map(total_hours, item => item?.label)}
                                                                         data={map(total_hours, item => item?.data)}
                                                                         background={map(total_hours, item => item?.backgroundColor)}
                                                                         title={"Horas por trabajador"}/> :
                        <Skeleton count={20}/>}
                </div>
                <div className={"w-full md:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_failures && size(count_failures) > 0 ?
                        <PieChart labels={map(count_failures, item => item?.label)}
                                  data={map(count_failures, item => item?.data)}
                                  background={map(count_failures, item => item?.backgroundColor)}
                                  title={"Origen de fallas"}/> : <Skeleton count={20}/>}
                </div>
                <div className={"w-full md:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_type && size(count_type) > 0 ? <PieChart labels={map(count_type, item => item?.label)}
                                                                    data={map(count_type, item => item?.data)}
                                                                    background={map(count_type, item => item?.backgroundColor)}
                                                                    title={"Tipo de mantenimiento"}/> :
                        <Skeleton count={20}/>}
                </div>
                <div className={"w-full md:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_physical && size(count_physical) > 0 ?
                        <PieChart labels={map(count_physical, item => item?.label)}
                                  data={map(count_physical, item => item?.data)}
                                  background={map(count_physical, item => item?.backgroundColor)}
                                  title={"OT por equipos"}/> :
                        <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full md:w-3/12 sm:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {count_fixed && size(count_fixed) > 0 ? <PieChart labels={map(count_fixed, item => item?.label)}
                                                                      data={map(count_fixed, item => item?.data)}
                                                                      background={map(count_fixed, item => item?.backgroundColor)}
                                                                      title={"OT por ubicaciones"}/> :
                        <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full md:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {indicators && size(indicators) > 0 ? <HorizontalBar title={"MTTR"}
                                                                         labels={map(indicators, item => item.label_mttr)}
                                                                         data={map(indicators, item => item?.data_mttr)}
                                                                         background={map(indicators, item => item?.backgroundColor)}
                    /> : <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full md:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {indicators && size(indicators) > 0 ? <HorizontalBar title={"MTBF"}
                                                                         labels={map(indicators, item => item.label_mtbf)}
                                                                         data={map(indicators, item => item?.data_mtbf)}
                                                                         background={map(indicators, item => item?.backgroundColor)}
                    /> : <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full md:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {indicators && size(indicators) > 0 ? <HorizontalBar title={"Disponibilidad"}
                                                                         labels={map(indicators, item => item.label_available)}
                                                                         data={map(indicators, item => item?.data_available)}
                                                                         background={map(indicators, item => item?.backgroundColor)}
                    /> : <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full md:w-5/12 shadow-lg h-max rounded-lg p-2 t-16"}>
                    {indicators && size(indicators) > 0 ? <HorizontalBar title={"Fiabilidad"}
                                                                         labels={map(indicators, item => item.label_reliability)}
                                                                         data={map(indicators, item => item?.data_reliability)}
                                                                         background={map(indicators, item => item?.backgroundColor)}
                    /> : <Skeleton count={20} width={200} className={"bg-red-600"}/>}
                </div>
                <div className={"w-full  shadow-lg h-max rounded-lg p-2 t-16"}>
                    <Table total_ot={total_ot}/>
                </div>
            </div>

        </div>

    );
};

export default KPI;
