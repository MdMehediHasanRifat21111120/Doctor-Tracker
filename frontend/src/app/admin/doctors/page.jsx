"use client"
import { useGetDoctorsQuery } from "@/redux/features/doctors/doctorApi"

export default function Doctors(){
    const {data,isLoading,error} = useGetDoctorsQuery();
    const doctors = data?.data?.doctors;
    return(
        <div>
            {doctors&&
                doctors.map((doctor)=>(
                    <div>
                        <h2>{doctor.name}</h2>
                        <p>{doctor.specialization}</p>
                        <p>{doctor.hospital}</p>
                        <p>{doctor.phone}</p>
                    </div>
                ))
            }
        </div>
    )
}