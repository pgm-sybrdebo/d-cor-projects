import styled from "styled-components";
import { Report } from "../../interfaces";
import ReportCard from "../cards/ReportCard";

const ReportsContainer = styled.div`
  position: relative;
`;

const ReportContainerList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2rem;
  overflow-x: auto;
  padding-right: 2rem;

  &::-webkit-scrollbar {
    background-color: ${(props) => props.theme.colors.white};
    height: 0.75rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.darkGrey};
    border-radius: 1rem;
  }
`;

const OverlayGradient = styled.div`
  position: absolute;
  display: block;
  width: 3rem;
  height: 100%;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  position: absolute;
  bottom: 1rem;
  right: 0;
`;

export interface ReportListProps {
  reports: any;
  projectId: number;
  projectName: string;
  projectStreet: string;
  projectHouseNumber: number;
  projectCity: string;
}

const ReportList = ({
  reports,
  projectId,
  projectName,
  projectCity,
  projectStreet,
  projectHouseNumber,
}: ReportListProps) => {
  console.log(reports);
  return (
    <ReportsContainer>
      <ReportContainerList>
        {reports.map((report: Report) => (
          <ReportCard
            key={report.id}
            id={report.id}
            projectId={projectId}
            name={report.pdf}
            number={report.number}
            startDate={report.startDate}
            nextDate={report.nextDate}
            dcorprojects={report.dcorprojects}
            generalInfo={report.generalInfo}
            projectName={projectName}
            projectCity={projectCity}
            projectStreet={projectStreet}
            projectHouseNumber={projectHouseNumber}
          />
        ))}
        <OverlayGradient />
      </ReportContainerList>
    </ReportsContainer>
  );
};

export default ReportList;
