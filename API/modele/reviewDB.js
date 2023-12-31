module.exports.getReview = async (client, id) => {
    return await client.query("SELECT * FROM review WHERE id = $1", [id]);
};

module.exports.getAllReviews = async (client) => {
    return await client.query(
    `SELECT r.id, r.date, r.title, r.content, r.rating, r.likes_counter, r.dislikes_counter, r.book_id, 
    r.user_id, a.username, a.profile_picture_path AS account_img_path, b.isbn,b.title AS book_name, b.img_path AS book_img_path
    FROM review r 
    INNER JOIN account a ON r.user_id = a.id 
    INNER JOIN book b ON r.book_id = b.isbn 
    `);
};

module.exports.postReview = async (client, title, content, rating, user_id, book_id) => {
    return await client.query(`
        INSERT INTO review (date, rating, title, content, likes_counter, dislikes_counter, user_id, book_id)
        VALUES(CURRENT_DATE, $1, $2, $3, 0, 0, $4, $5)`, 
        [rating, title, content, user_id, book_id]);
};

module.exports.updateReview = async (client, id, title, new_content, rating) => {
    return await client.query(`
        UPDATE review
        SET date = CURRENT_DATE,
            title = $1,
            content = $2,
            rating = $4
        WHERE id = $3
        `, [title, new_content, id, rating]);
};

module.exports.deleteReview = async (client, id) => {
    return await client.query("DELETE FROM review WHERE id = $1", [id]);
};
module.exports.getBookRatings = async(isbn, client) =>{
    return await client.query("SELECT rating FROM review WHERE book_id = $1", [isbn]);
};

module.exports.deleteBookReviews = async (isbn, client) => {
    let querySet = [];
    let query = "DELETE FROM comment WHERE review_id IN (";
    const reviewIds = await client.query("SELECT id FROM review WHERE book_id = $1", [isbn]);
    reviewIds.rows.forEach(review => {
        querySet.push(` ${review.id}`);
    });
    query += querySet.join(',');
    query += ")";
    await client.query(query);
    return await client.query("DELETE FROM review WHERE book_id = $1", [isbn]);
};
