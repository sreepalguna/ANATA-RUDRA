export async function onRequestPost(context) {
    try {
        const data = await context.request.json();

        const {
            customer_name,
            business_name,
            email,
            problem_category,
            problem_description
        } = data;

        if (
            !customer_name ||
            !business_name ||
            !email ||
            !problem_category ||
            !problem_description
        ) {
            return Response.json(
                { error: "Please fill in all fields." },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${context.env.SUPABASE_URL}/rest/v1/business_enquiries`,
            {
                method: "POST",
                headers: {
                    "apikey": context.env.SUPABASE_SECRET_KEY,
                    "Authorization": `Bearer ${context.env.SUPABASE_SECRET_KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                    customer_name,
                    business_name,
                    email,
                    problem_category,
                    problem_description
                })
            }
        );

        if (!response.ok) {
    const errorDetails = await response.text();
    console.error("Supabase Error:", response.status, errorDetails);

    return Response.json(
        { error: "Could not save your enquiry." },
        { status: 500 }
    );
}

        return Response.json({ message: "Enquiry submitted successfully!" });

    } catch (error) {
        return Response.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}