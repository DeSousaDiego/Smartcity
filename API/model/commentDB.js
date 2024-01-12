module.exports.getComment= async (client, id) => {
    return await client.query("SELECT * FROM comment WHERE id = $1", [id]);
};

module.exports.getAllCommentsFromReviewId = async (client, idReview) =>{
    return await client.query(`
        SELECT c.id, a.username, r.title , c.content, c.likes_counter, c.dislikes_counter
        FROM comment c
        INNER JOIN account a ON c.user_id = a.id
        INNER JOIN review r ON c.review_id = r.id
        WHERE c.review_id = $1`, [idReview]
    );
};

module.exports.postComment = async (client, content, authorId, reviewId) => {
    return await client.query(`
        INSERT INTO comment(content, date, likes_counter, dislikes_counter, review_id, user_id)
        VALUES($1, CURRENT_DATE, 0, 0, $2, $3)
        RETURNING id`, [content, reviewId, authorId]
    );
};



module.exports.updateComment = async (client, id, newContent, user_id) => {
    return await client.query(`
        UPDATE comment
        SET content = $1,
            date = CURRENT_DATE,
            likes_counter = 0,
            dislikes_counter = 0,
            user_id = $3
        WHERE id = $2
        RETURNING id`, [newContent, id, user_id]                          
    );
};


module.exports.deleteComment = async (client, id) => {
    return await client.query("DELETE FROM comment WHERE id = $1", [id]);
};

module.exports.deleteCommentsFromReview = async (client, reviewId) => {
    return await client.query("DELETE FROM comment WHERE review_id = $1", [reviewId]);
};
