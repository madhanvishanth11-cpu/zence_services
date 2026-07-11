export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  try {
    const {
      fullName,
      businessEmail,
      businessPhone,
      coreService,
      projectScope
    } = req.body || {};

    if (
      !fullName?.trim() ||
      !businessEmail?.trim() ||
      !businessPhone?.trim() ||
      !coreService?.trim() ||
      !projectScope?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields."
      });
    }

    const payload = {
      date: new Date().toISOString(),
      fullName: fullName.trim(),
      businessEmail: businessEmail.trim(),
      businessPhone: businessPhone.trim(),
      coreService: coreService.trim(),
      projectScope: projectScope.trim()
    };

    console.log("Sending payload to Make:", payload);

    const makeResponse = await fetch(
      "https://madhanai.app.n8n.cloud/webhook-test/6713e165-cb66-4ee2-a5f8-c35f26627ee7",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const makeResponseText = await makeResponse.text();

    console.log("Make response status:", makeResponse.status);
    console.log("Make response body:", makeResponseText);

    if (!makeResponse.ok) {
      return res.status(502).json({
        success: false,
        message: "Make webhook rejected the request.",
        makeStatus: makeResponse.status
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your details were submitted successfully."
    });
  } catch (error) {
    console.error("Contact API complete error:", error);

    return res.status(500).json({
      success: false,
      message: "Server failed to process the request."
    });
  }
}
