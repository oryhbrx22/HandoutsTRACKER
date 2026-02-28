// Database utility wrapper for Trickle DB
const TABLE_NAME = 'cym_submission';

const DB = {
    // Save submission (create or update)
    saveSubmission: async (data) => {
        try {
            // Ensure status is active for new submissions if not specified
            if (!data.status) data.status = 'active';

            const allSubmissions = await DB.getSubmissions();
            const existing = allSubmissions.find(s => 
                s.objectData.member_name.toLowerCase() === data.member_name.toLowerCase() &&
                s.objectData.year === data.year &&
                s.objectData.month === data.month &&
                s.objectData.submission_type === data.submission_type
            );

            if (existing) {
                // Update
                return await trickleUpdateObject(TABLE_NAME, existing.objectId, data);
            } else {
                // Create
                return await trickleCreateObject(TABLE_NAME, data);
            }
        } catch (error) {
            console.error("DB Save Error:", error);
            throw error;
        }
    },

    // Get all submissions
    getSubmissions: async () => {
        try {
            // Fetching a reasonable limit
            const result = await trickleListObjects(TABLE_NAME, 1000, true);
            return result.items || [];
        } catch (error) {
            console.error("DB Fetch Error:", error);
            throw error;
        }
    },
    
    // Get submissions by month/year
    getSubmissionsByDate: async (month, year) => {
        const all = await DB.getSubmissions();
        return all.filter(item => 
            item.objectData.month === parseInt(month) && 
            item.objectData.year === parseInt(year)
        );
    },

    // Archive a submission
    archiveSubmission: async (id) => {
        try {
            return await trickleUpdateObject(TABLE_NAME, id, { status: 'archived' });
        } catch (error) {
            console.error("DB Archive Error:", error);
            throw error;
        }
    },

    // Restore a submission
    restoreSubmission: async (id) => {
        try {
            return await trickleUpdateObject(TABLE_NAME, id, { status: 'active' });
        } catch (error) {
            console.error("DB Restore Error:", error);
            throw error;
        }
    },

    // Delete a submission permanently
    deleteSubmission: async (id) => {
        try {
            return await trickleDeleteObject(TABLE_NAME, id);
        } catch (error) {
            console.error("DB Delete Error:", error);
            throw error;
        }
    }
};