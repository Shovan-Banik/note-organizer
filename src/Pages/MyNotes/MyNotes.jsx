import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAllNotesDB from "../../hooks/useAllNotesDB";
import NoteTab from "../NoteTab/NoteTab";
import { Helmet } from "react-helmet-async";

const MyNotes = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [allNotes] = useAllNotesDB();

    const important_note = allNotes.filter(notes => notes.category === 'important');
    const job_note = allNotes.filter(notes => notes.category === 'job');
    const daily_note = allNotes.filter(notes => notes.category === 'daily');
    const meeting_note = allNotes.filter(notes => notes.category === 'meeting');

    return (
        <>
            <Helmet>
                <title>Note Organizer | My Notes</title>
            </Helmet>
            <h2 className="text-5xl font-bold text-white text-center py-8">My All Notes Categories</h2>

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="md:space-x-4 md:pl-36 mt-12">
                    <Tab className="tab tab-bordered bg-black text-white">Important Note</Tab>
                    <Tab className="tab tab-bordered bg-black text-white">Daily Note</Tab>
                    <Tab className="tab tab-bordered bg-black text-white">Job Task Note</Tab>
                    <Tab className="tab tab-bordered bg-black text-white">Meeting Note</Tab>
                </TabList>

                <TabPanel>
                    <NoteTab note_category={important_note}></NoteTab>
                </TabPanel>
                <TabPanel>
                    <NoteTab note_category={daily_note}></NoteTab>
                </TabPanel>
                <TabPanel>
                    <NoteTab note_category={job_note}></NoteTab>
                </TabPanel>
                <TabPanel>
                    <NoteTab note_category={meeting_note}></NoteTab>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default MyNotes;