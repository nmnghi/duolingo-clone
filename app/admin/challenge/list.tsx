import {
  Datagrid,
  List,
  TextField,
  ReferenceField,
  NumberField,
  SelectField,
} from "react-admin";

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="question" />
        <SelectField
          source="type"
          choices={[
            {
              id: "SELECT",
              name: "SELECT",
            },
            {
              id: "ASSIST",
              name: "ASSIST",
            },
            {
              id: "MATCH",
              name: "MATCH",
            },
            {
              id: "AUDIO_TRANSCRIPTION",
              name: "AUDIO_TRANSCRIPTION",
            },
            {
              id: "DIALOGUE",
              name: "DIALOGUE",
            },
            {
              id: "TRANSLATION",
              name: "TRANSLATION",
            },
          ]}
        />
        <ReferenceField source="lessonId" reference="lessons" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};