exports.addSkill = (req, res) => {
    if (!req.body.skill) return res.status(400).json({error: "Invalid request"});

    let new_skill = createSkillObject(req.body.skill.name, req.body.skill.url, req.body.skill.method, req.body.skill.content_type, req.body.skill.body);
    if (new_skill === null) {
        return res.status(400).json({error: "Invalid skill params"})
    }

    let add_skill_status = addSkillToGlobalScope(new_skill);
    if (!add_skill_status) return res.status(400).json({error: "Skill with name " + new_skill.route + " already exists"});

    return res.status(200).json({message: "Skill with name " + new_skill.route + " added"})
}

exports.useSkill = (req, res) => {
    if (!req.params.skill_name) return res.status(400).json({message: "Invalid request"});

    let skill = getSkillFromGlobalScope(req.params.skill_name);

    if (!skill) return res.status(400).json({message: "Skill does not exist."});

    // TODO: Should send request from skill and return response from server
    // TODO: <--!!! U R G E N T !!!-->

    return res.status(200).json({message: "Skill activated successfully", skill: skill})

}

const createSkillObject = (name, url, method, content_type, body = null) => {
    let skill = {
        route: "",
        url: "",
        method: "",
        content_type: "",
        body: null
    }

    if (!url || typeof url !== "string") {
        return null
    }

    skill.url = url.toLowerCase();

    if (!name || typeof name !== "string") {
        return null
    }

    skill.route = name.toLowerCase();

    if (!content_type || typeof content_type !== "string") {
        return null
    }

    switch (content_type) {
        case "application/json":
            skill.content_type = "application/json"; 
            break;
        case "text/plain":
            skill.content_type = "text/plain";
            break;
        case "application/x-www-form-urlencoded":
            skill.content_type = "application/x-www-form-urlencoded";
            break;
        default:
            return null
    }

    if (!method || typeof method !== "string") {
        return null
    }

    switch (method.toLowerCase()) {
        case "get":
            skill.method = "GET";
            return skill;
        case "post":
            skill.method = "POST";
            break;
        case "put":
            skill.method = "PUT";
            break;
        case "delete":
            skill.method = "DELETE";
            break;
        default:
            return null
    }

    if (body !== null && typeof body === "object") {
        skill.body = body;
    }

    return skill
}

const getSkillFromGlobalScope = (route) => {
    return global.SKILLS[route] 
}

const addSkillToGlobalScope = (skill) => {
    // TODO: Some validation should be implemented

    let check_skill = getSkillFromGlobalScope(skill.route);

    if (check_skill && typeof check_skill === "object") {
        return false
    }

    global.SKILLS[skill.route] = skill;
    return true
}