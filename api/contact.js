export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

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

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(businessEmail.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid business email."
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const makeResponse = await fetch(
      "https://hook.us2.make.com/fxokpggy2lnyy1q7jkgkeexek4nwx3g5",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: new Date().toISOString(),
          fullName: fullName.trim(),
          businessEmail: businessEmail.trim(),
          businessPhone: businessPhone.trim(),
          coreService: coreService.trim(),
          projectScope: projectScope.trim()
        }),
        signal: controller.signal
      }
    );

    const makeResponseText = await makeResponse.text();

    console.log("Make status:", makeResponse.status);
    console.log("Make response:", makeResponseText);

    if (!makeResponse.ok) {
      throw new Error(
        `Make webhook failed with status ${makeResponse.status}`
      );
    }

    return res.status(200).json({
      success: true,
      message: "Your details were submitted successfully."
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return res.status(502).json({
      success: false,
      message: "Unable to submit your request."
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
