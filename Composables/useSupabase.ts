import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhma3BqenlxY2llbnJ2cWxtZWpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTMzMTQ3OTMsImV4cCI6MTk2ODg5MDc5M30.HgAYu7s5GOWVOpNmNtSbSKeoH2bxypTwVI_QYA_Esck'

const SUPABASE_URL = "https://xfkpjzyqcienrvqlmejs.supabase.co"


const useSupabase = () => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    return {
      supabase,
    }
};

export default useSupabase